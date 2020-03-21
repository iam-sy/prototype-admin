<template>
    <div class="code-editor">
        <form>
            <input
                class="code-editor__file"
                type="file"
                tabindex="-1"
                title="첨부파일"
                accept=".gif, .jpg, .png"
                ref="fileinput"
            />
        </form>
        <p class="code-editor__desc">
            ※ 편집중 esc키를 누르시면 편집모드가 종료됩니다.
        </p>
        <vue-simplemde
            ref="markdownEditor"
            :value="content"
            :configs="configs"
            @input="handleInput"
            preview-class="markdown-body"
        />
        <div
            class="code-editor__end"
            aria-hidden="true"
            tabindex="-1"
            ref="editEnd"
        ></div>
    </div>
</template>

<script>
import VueSimplemde from 'vue-simplemde';
import { uploadImage } from '@/api';
export default {
    props: ['content', 'disableTab'],
    components: {
        VueSimplemde,
    },
    data() {
        return {
            configs: {
                status: false,
                spellChecker: false,
                toolbar: [
                    {
                        name: 'heading',
                        action: sim => sim.toggleHeadingSmaller(),
                        className: 'fa fa-header fa-header',
                        title: 'Bold',
                    },
                    {
                        name: 'unordered-list',
                        action: sim => sim.toggleUnorderedList(),
                        className: 'fa fa-list-ul',
                        title: 'Generic List',
                    },
                    {
                        name: 'ordered-list',
                        action: sim => sim.toggleOrderedList(),
                        className: 'fa fa-list-ol',
                        title: 'Numbered List',
                    },
                    '|',
                    {
                        name: 'bold',
                        action: sim => sim.toggleBold(),
                        className: 'fa fa-bold',
                        title: 'Bold',
                    },
                    {
                        name: 'italic',
                        action: sim => sim.toggleItalic(),
                        className: 'fa fa-italic',
                        title: 'Italic',
                    },
                    {
                        name: 'strikethrough',
                        action: sim => sim.toggleStrikethrough(),
                        className: 'fa fa-strikethrough',
                        title: 'Strikethrough',
                    },
                    '|',
                    {
                        name: 'quote',
                        action: sim => sim.toggleBlockquote(),
                        className: 'fa fa-quote-left',
                        title: 'Quote',
                    },

                    {
                        name: 'code',
                        action: sim => sim.toggleCodeBlock(),
                        className: 'fa fa-code',
                        title: 'Code',
                    },
                    '|',

                    {
                        name: 'table',
                        action: sim => sim.drawTable(),
                        className: 'fa fa-table',
                        title: 'Insert Table',
                    },

                    {
                        name: 'horizontal-rule',
                        action: sim => sim.drawHorizontalRule(),
                        className: 'fa fa-minus',
                        title: 'Insert Horizontal Line',
                    },
                    {
                        name: 'image',
                        action: () => this.$refs.fileinput.click(),
                        className: 'fa fa-image',
                        title: 'Upload Image',
                    },
                ],
            },
        };
    },
    methods: {
        handleInput(data) {
            this.$emit('update', data);
        },
        uploadImagesFile(simplemde, files) {
            let params = files.map(file => {
                let param = new FormData();
                param.append('file', file, file.name);
                return param;
            });
            uploadImage(simplemde, params);
        },
    },
    mounted() {
        const self = this;
        const editor = this.$refs.markdownEditor;
        const simplemde = editor.simplemde;
        for (let tool in simplemde.toolbarElements) {
            simplemde.toolbarElements[tool].tabIndex = 0;
        }
        simplemde.codemirror.tabSize = 4;
        if (this.disableTab) {
            simplemde.codemirror.options.extraKeys.Tab = false;
        }
        simplemde.codemirror.options.extraKeys['Shift-Tab'] = false;
        simplemde.codemirror.options.extraKeys.Esc = function(cm) {
            self.$refs.editEnd.focus();
        };
        this.$refs.fileinput.addEventListener('change', e => {
            this.uploadImagesFile(simplemde, [e.target.files[0]]);
        });

        simplemde.codemirror.on('paste', (editor, e) => {
            if (!(e.clipboardData && e.clipboardData.items)) {
                console.log(e);
                return;
            }
            try {
                let dataList = e.clipboardData.items;
                if (
                    dataList[0].kind === 'file' &&
                    dataList[0].getAsFile().type.indexOf('image') !== -1
                ) {
                    e.preventDefault();
                    this.uploadImagesFile(simplemde, [dataList[0].getAsFile()]);
                }
            } catch (e) {
                console.log(e);
            }
        });
    },

    beforeDestroy() {
        this.$refs.fileinput.removeEventListener('change', null);
        this.$refs.fileinput.removeEventListener('paste', null);
    },
};
</script>

<style lang="scss">
.code-editor {
    flex: 1 1 0%;
    min-height: 0;
    &__desc {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
    }
    .CodeMirror-scroll {
        box-sizing: content-box;
    }
    .vue-simplemde {
        flex: 1 1 0%;
        flex-direction: column;
        display: flex;
        min-height: 0;
        height: calc(100% - 22px);
    }
    .CodeMirror,
    .CodeMirror-scroll {
        min-height: 0;
        height: 100%;
    }
    .CodeMirror-code {
        line-height: 1.25;
        pre {
            line-height: 1.5;
        }
    }
    &__file {
        position: absolute;
        left: -999em;
        top: -999em;
        height: 0;
        width: 0;
        opacity: 0;
        overflow: hidden;
        line-height: 0;
        visibility: hidden;
    }
}
</style>
