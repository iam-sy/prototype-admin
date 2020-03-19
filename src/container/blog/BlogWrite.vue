<template>
    <div class="board-write">
        <div class="board-write__body">
            <div class="board-write__editor">
                <div class="board-write__editflex">
                    <div class="board-write__head">
                        <div class="board-write__sec">
                            <select
                                id="sel_sec"
                                title="section 선택"
                                @change="secSelect"
                            >
                                <option value="review">review</option>
                                <option value="study">study</option>
                            </select>
                        </div>
                        <div class="board-write__title">
                            <ValidationProvider
                                rules="required"
                                v-slot="{ errors, failedRules }"
                                tag="div"
                                mode="eager"
                            >
                                <input
                                    autocomplete="off"
                                    type="text"
                                    name="inp__tit"
                                    id="inp__tit"
                                    title="제목 입력"
                                    placeholder="제목을 입력하세요"
                                    v-model="title"
                                />

                                <p class="is-error" v-if="failedRules.required">
                                    제목을 입력하세요.
                                </p>
                            </ValidationProvider>
                        </div>
                    </div>
                    <div class="board-write__tags">
                        <TagEditor :tags.sync="tags"></TagEditor>
                    </div>
                    <div class="board-write__sumnail">
                        <input
                            type="file"
                            title="첨부파일 선택"
                            accept=".gif, .jpg, .png"
                            ref="fileinput"
                            @change="sumnailFile"
                            autocomplete="off"
                        />
                    </div>
                    <div class="board-write__desc">
                        <textarea
                            title="요약설명 입력"
                            v-model="desc"
                        ></textarea>
                    </div>
                    <div class="board-write__code-editor">
                        <CodeEditor
                            ref="codeEditor"
                            v-model="content"
                            @update="contentUpdate"
                        ></CodeEditor>
                    </div>
                </div>
            </div>
            <div class="board-write__preview">
                <CodeViewer
                    :desc="desc"
                    :sumnail="sumnail"
                    :content="content"
                    :title="title"
                    :tags="tags"
                ></CodeViewer>
            </div>
        </div>

        <div class="board-write__control cta-wrap">
            <button type="button" class="cta" @click="cancelPost">
                <span>취소</span>
            </button>
            <button type="button" @click="submitPost" class="cta cta--green">
                <span>등록</span>
            </button>
        </div>
    </div>
</template>
<script>
import { createPost } from '@/api/index';
import TagEditor from '@/components/CodeEditor/TagEditor';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import CodeViewer from '@/components/CodeEditor/CodeViewer';
import { uploadImage } from '@/api';
export default {
    name: 'BlogWrite',
    data() {
        return {
            sec: 'review',
            title: '',
            tags: [],
            desc: '',
            sumnail: '',
            content: '',
        };
    },
    components: {
        TagEditor,
        CodeEditor,
        CodeViewer,
    },
    methods: {
        async submitPost() {
            let param = new FormData();
            param.append('sumnail', this.sumnail);
            param.append('desc', this.desc);
            param.append('title', this.title);
            param.append('content', this.content);
            param.append('tags', this.tags);
            param.append('sec', this.sec);

            try {
                const res = await createPost(param);
                this.$router.push('/blog/list');
            } catch (e) {
                if (e.response.data.message)
                    this.logMessage = e.response.data.message;
            }
        },
        secSelect(e) {
            this.sec = e.target.value;
        },
        cancelPost() {
            this.$router.push('/blog/list');
        },
        sumnailFile(e) {
            this.sumnail = e.target.files[0];
        },
        contentUpdate(content) {
            this.content = content;
        },
    },
};
</script>

<style scoped lang="scss">
.board-write {
    padding: 30px 60px;
    display: flex;
    height: calc(100vh - 56px);
    flex-direction: column;

    &__head {
        display: flex;
        align-items: center;
    }
    &__title {
        width: 100%;
        margin-left: 20px;
        input {
            @include input();
        }
    }
    &__desc {
        padding-bottom: 20px;
    }
    &__body {
        width: 100%;
        height: calc(100% - 60px);
        display: flex;
    }
    &__editor,
    &__preview {
        width: 50%;
    }
    &__sumnail {
        padding-bottom: 10px;
    }

    &__editflex {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    &__code-editor {
        min-height: 0;
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
    }

    &__preview {
        margin-left: 30px;
        height: 100%;
        overflow: auto;
    }
    &__control {
        margin-top: auto;
    }
}
</style>
