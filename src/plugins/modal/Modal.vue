<template>
    <transition
        :name="transition"
        @before-enter="beforeEnterTransition"
        @enter="enterTransition"
        @after-enter="afterEnterTransition"
        @before-leave="beforeLeaveTransition"
        @leave="leaveTransition"
        @after-leave="afterLeaveTransition"
    >
        <section
            :id="name"
            :class="modalClass"
            role="dialog"
            v-if="visible"
            :style="modalStyle"
        >
            <div class="c-modal__container" role="document">
                <div class="c-modal__header" v-if="this.$slots.header">
                    <h2 class="titleid">
                        <slot name="header" />
                    </h2>
                </div>
                <div class="c-modal__body" tabindex="-1" ref="c-modal__body">
                    <slot>modal content</slot>
                </div>
                <div class="c-modal__footer" v-if="this.$slots.footer">
                    <slot name="footer"></slot>
                </div>
                <div class="c-modal__close">
                    <slot name="close">
                        <button
                            type="button"
                            class="c-modal__closebtn"
                            @click="closeModal"
                        >
                            <span>닫기</span>
                        </button>
                    </slot>
                </div>
            </div>
        </section>
    </transition>
</template>
<script>
import Modal from '@/plugins/modal/index';
import { parseNumber } from '@/plugins/modal/parser';
import {
    createModalEvent,
    inRange,
    stringStylesToObject,
    windowWidthWithoutScrollbar,
} from '@/plugins/modal/utils';
import eventBus from '@/utils/eventBus';
/*
 *
 * 5. key event
 * 7. autoHeight
 *
 * */
export default {
    props: {
        name: {
            required: true,
            type: String,
        },
        adaptive: {
            type: Boolean,
            default: false,
        },
        classes: String,
        dim: {
            type: Boolean,
            default: true,
        },
        dimClose: {
            type: Boolean,
            default: true,
        },
        transition: {
            type: String,
            default: 'modal',
        },
        width: {
            type: [Number, String],
            default: 600,
        },
        height: {
            type: [Number, String],
            default: 600,
        },
        minWidth: {
            type: Number,
            default: 0,
            validator(value) {
                return value >= 0;
            },
        },
        minHeight: {
            type: Number,
            default: 0,
            validator(value) {
                return value >= 0;
            },
        },
        maxWidth: {
            type: [Number, String],
            default: `${Number.MAX_SAFE_INTEGER}px`,
        },
        maxHeight: {
            type: [Number, String],
            default: `${Number.MAX_SAFE_INTEGER}px`,
        },
        beforeEnter: {
            type: Function,
        },
        enter: {
            type: Function,
        },
        afterEnter: {
            type: Function,
        },
        beforeLeave: {
            type: Function,
        },
        leave: {
            type: Function,
        },
        afterLeave: {
            type: Function,
        },
    },
    data() {
        return {
            visible: false,
            visibility: {
                modal: false,
                overlay: false,
            },

            shift: {
                left: 0,
                top: 0,
            },
            viewport: {
                width: 0,
                height: 0,
            },
            modal: {
                width: 0,
                widthType: 'px',
                height: 0,
                heightType: 'px',
                renderedHeight: 0,
            },
        };
    },
    created() {
        this.setInitialSize();
    },
    beforeMount() {
        Modal.event.$on('toggle', this.handleToggleEvent);
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    },
    beforeDestroy() {
        Modal.event.$off('toggle', this.handleToggleEvent);
        window.removeEventListener('resize', this.handleWindowResize);
    },
    computed: {
        isAutoHeight() {
            return this.modal.heightType === 'auto';
        },
        position() {
            const {
                viewport,
                shift,
                pivotX,
                pivotY,
                trueModalWidth,
                trueModalHeight,
            } = this;

            const maxLeft = viewport.width - trueModalWidth;
            const maxTop = viewport.height - trueModalHeight;

            const left = shift.left + pivotX * maxLeft;
            const top = shift.top + pivotY * maxTop;

            return {
                left: parseInt(inRange(0, maxLeft, left)),
                top: parseInt(inRange(0, maxTop, top)),
            };
        },
        trueModalWidth() {
            const { viewport, modal, adaptive, minWidth, maxWidth } = this;

            const value =
                modal.widthType === '%'
                    ? (viewport.width / 100) * modal.width
                    : modal.width;

            const max = Math.max(minWidth, Math.min(viewport.width, maxWidth));

            return adaptive ? inRange(minWidth, max, value) : value;
        },
        trueModalHeight() {
            const {
                viewport,
                modal,
                isAutoHeight,
                adaptive,
                minHeight,
                maxHeight,
            } = this;

            const value =
                modal.heightType === '%'
                    ? (viewport.height / 100) * modal.height
                    : modal.height;

            if (isAutoHeight) {
                // use renderedHeight when height 'auto'
                return this.modal.renderedHeight;
            }

            const max = Math.max(
                minHeight,
                Math.min(viewport.height, maxHeight),
            );

            return adaptive ? inRange(minHeight, max, value) : value;
        },
        stylesProp() {
            return typeof this.styles === 'string'
                ? stringStylesToObject(this.styles)
                : this.styles;
        },
        modalStyle() {
            return [
                this.stylesProp,
                {
                    top: this.position.top + 'px',
                    left: this.position.left + 'px',
                    width: this.trueModalWidth + 'px',
                    height: this.isAutoHeight
                        ? 'auto'
                        : this.trueModalHeight + 'px',
                },
            ];
        },
        modalClass() {
            return ['c-modal', this.classes];
        },
    },
    methods: {
        closeModal() {
            this.toggle(false);
        },
        handleWindowResize() {
            this.viewport.width = windowWidthWithoutScrollbar();
            this.viewport.height = window.innerHeight;

            this.ensureShiftInWindowBounds();
        },
        ensureShiftInWindowBounds() {
            const {
                viewport,
                shift,
                pivotX,
                pivotY,
                trueModalWidth,
                trueModalHeight,
            } = this;

            const maxLeft = viewport.width - trueModalWidth;
            const maxTop = viewport.height - trueModalHeight;

            const left = shift.left + pivotX * maxLeft;
            const top = shift.top + pivotY * maxTop;

            this.shift.left -= left - inRange(0, maxLeft, left);
            this.shift.top -= top - inRange(0, maxTop, top);
        },
        setInitialSize() {
            const { modal } = this;
            const width = parseNumber(this.width);
            const height = parseNumber(this.height);

            modal.width = width.value;
            modal.widthType = width.type;
            modal.height = height.value;
            modal.heightType = height.type;
        },
        createModalEvent(args = {}) {
            return createModalEvent({
                name: this.name,
                ref: this.$refs.modal,
                ...args,
            });
        },
        dimControl(nextState) {
            if (nextState) {
                eventBus.$on('modalToggle', this.toggle);
                this.$dim.show();
            } else {
                eventBus.$off('modalToggle', this.toggle);
                this.$dim.hide();
            }
        },
        toggle(nextState, params) {
            console.log('toggle', nextState);
            const { reset, scrollable, visible } = this;
            if (visible === nextState) {
                return;
            }
            const beforeEventName = visible ? 'before-close' : 'before-open';
            let stopEventExecution = false;

            const stop = () => {
                stopEventExecution = true;
            };

            const beforeEvent = this.createModalEvent({
                stop,
                state: nextState,
                params,
            });

            this.$emit(beforeEventName, beforeEvent);

            if (!stopEventExecution) {
                if (this.dim) {
                    this.dimControl(nextState);
                }
                this.visible = nextState;
            }
        },
        handleToggleEvent(name, state, params) {
            if (this.name === name) {
                const nextState =
                    typeof state === 'undefined' ? !this.visible : state;
                this.toggle(nextState, params);
            }
        },
        beforeEnterTransition(e) {
            if (this.beforeEnter) {
                const data = this.createModalEvent();
                this.beforeEnter(e, data);
            }
        },
        enterTransition(e) {
            if (this.enter) {
                const data = this.createModalEvent();
                this.enter(e, data);
            }
        },
        afterEnterTransition(e) {
            if (this.afterEnter) {
                const data = this.createModalEvent();
                this.afterEnter(e, data);
            }
        },
        beforeLeaveTransition(e) {
            if (this.beforeLeave) {
                const data = this.createModalEvent();
                this.beforeLeave(e, data);
            }
        },
        leaveTransition(e) {
            if (this.leave) {
                const data = this.createModalEvent();
                this.leave(e, data);
            }
        },
        afterLeaveTransition(e) {
            if (this.afterLeave) {
                const data = this.createModalEvent();
                this.afterLeave(e, data);
            }
        },
    },
};
</script>

<style scoped lang="scss">
.c-modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    border: 1px solid #efefef;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 12px 0px;
    &__container {
        position: relative;
    }
    &__close {
        position: absolute;
        right: -20px;
        top: -20px;
        width: 40px;
        height: 40px;
    }
    &__closebtn {
        position: relative;
        background-color: #fff;
        width: 100%;
        height: 100%;
        border: 1px solid #ececec;
        border-radius: 50%;
        &:before,
        &:after {
            content: '';
            display: block;
            width: 1px;
            height: 18px;
            position: absolute;
            left: 50%;
            top: 50%;
            background-color: #111;
        }
        &:before {
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &:after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        span {
            font-size: 0;
            line-height: 0;
            overflow: hidden;
            text-indent: -999em;
        }
    }
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.5s;
}

.modal-enter, .modal-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
