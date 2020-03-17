<template>
    <div class="board-write">
        <div class="board-write__body">
            <div class="board-write__editor">
                <div class="board-write__editflex">
                    <div class="board-write__title">
                        <ValidationProvider
                            rules="required"
                            v-slot="{ errors, failedRules }"
                            tag="div"
                            mode="eager"
                        >
                            <input
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
                    <div class="board-write__tags">
                        <TagEditor :tags.sync="tags"></TagEditor>
                    </div>
                    <div class="board-write__code-editor">
                        <CodeEditor
                            v-model="content"
                            @update="contentUpdate"
                        ></CodeEditor>
                    </div>
                </div>
            </div>
            <div class="board-write__preview">
                <CodeViewer
                    :content="content"
                    :title="title"
                    :tags="tags"
                ></CodeViewer>
            </div>
        </div>

        <div class="board-write__control cta-wrap">
            <button type="button" class="cta"><span>취소</span></button>
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

export default {
    name: 'BlogWrite',
    data() {
        return {
            title: '',
            tags: [],

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
            const data = {
                title: this.title,
                content: this.content,
                tags: this.tags,
            };

            try {
                const res = await createPost(data);
                this.title = '';
                this.content = '';
                this.tags = [];
                console.log(res);
            } catch (e) {
                if (e.response.data.message)
                    this.logMessage = e.response.data.message;
            }
        },
        contentUpdate(content) {
            this.content = content;
        },
    },
};
</script>

<style scoped lang="scss">
.board-write {
    padding: 60px;
    display: flex;
    height: calc(100vh - 56px);
    flex-direction: column;
    input {
        @include input();
    }
    &__body {
        width: 100%;
        height: calc(100% - 60px;);
        display: flex;
    }
    &__editor,
    &__preview {
        width: 50%;
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
