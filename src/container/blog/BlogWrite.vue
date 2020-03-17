<template>
    <div class="board-write">
        <div class="board-write__body">
            <div class="board-write__editor">
                <div class="board-write__editflex">
                    <div class="board-write__title">
                        <input
                            type="text"
                            name="inp__tit"
                            id="inp__tit"
                            title="제목 입력"
                            placeholder="제목을 입력하세요"
                            v-model="title"
                        />
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
        <div class="board-write__control">
            <button type="button"><span>취소</span></button>
            <button type="button" @click="submitPost">
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
    display: flex;
    height: calc(100vh - 56px - 100px);
    flex-direction: column;
    input {
        font-family: 'Noto Sans KR';
        font-size: 32px;
        border: {
            width: 0 0 1px 0;
            style: solid;
            color: #eaecef;
        }
        background: transparent;
        width: 100%;
        &::placeholder {
            font-size: 32px;
            color: $color3;
        }
    }
    &__body {
        width: 100%;
        height: 100%;
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
        height: calc(100vh - 56px - 100px);
        overflow: auto;
    }
    &__control {
        margin-top: auto;
    }
}
</style>
