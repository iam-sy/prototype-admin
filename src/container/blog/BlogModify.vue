<template>
    <div class="board-write">
        <div class="board-write__body">
            <div class="board-write__editor">
                <ValidationObserver ref="form">
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

                                    <p
                                        class="is-error"
                                        v-if="failedRules.required"
                                    >
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
                            <ValidationProvider
                                rules="required"
                                v-slot="{ errors, failedRules }"
                                tag="div"
                                mode="eager"
                            >
                                <textarea
                                    title="요약설명 입력"
                                    v-model="desc"
                                ></textarea>
                                <p class="is-error" v-if="failedRules.required">
                                    요약설명을 입력하세요.
                                </p>
                            </ValidationProvider>
                        </div>
                        <div class="board-write__code-editor">
                            <CodeEditor
                                ref="codeEditor"
                                :content.sync="content"
                                @update="contentUpdate"
                            ></CodeEditor>
                        </div>
                    </div>
                </ValidationObserver>
            </div>
            <div class="board-write__preview">
                <CodeViewer
                    :desc="desc"
                    :image="addressCompile"
                    :content="content"
                    :title="title"
                    :tags="tags"
                ></CodeViewer>
            </div>
        </div>

        <div class="board-write__control cta-wrap">
            <button type="button" class="cta cta--dark" @click="cancelPost">
                <span>취소</span>
            </button>
            <button type="button" @click="submitPost" class="cta cta--green">
                <span>등록</span>
            </button>
            <button type="button" @click="deletePost" class="cta">
                <span>삭제</span>
            </button>
        </div>
    </div>
</template>
<script>
import { imagePath } from '@/utils/parser';
import {
    fetchData,
    fetchPostById,
    editPostById,
    deletePostById,
} from '@/api/index';
import TagEditor from '@/components/CodeEditor/TagEditor';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import CodeViewer from '@/components/CodeEditor/CodeViewer';
export default {
    name: 'BlogModify',
    data() {
        return {
            sec: 'review',
            title: '',
            tags: [],
            desc: '',
            sumnail: '',
            image: '',
            base64: '',
            content: '',
        };
    },
    components: {
        TagEditor,
        CodeEditor,
        CodeViewer,
    },
    watch: {
        sumnail() {
            this.createImage(this.sumnail);
        },
    },
    methods: {
        setForm({ posts: { sec, title, image, tags, desc, content } }) {
            this.sec = sec;
            this.title = title;
            this.image = image;
            this.tags = tags;
            this.desc = desc;
            this.content = content;
        },

        async deletePost(id) {
            try {
                const id = this.$route.params.id;
                if (confirm('Delete it?')) {
                    const response = await deletePostById(id);
                    this.$router.push('/blog/list');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async submitPost() {
            const valid = await this.$refs.form.validate();
            if (!valid) return;

            let param = new FormData();
            param.append('image', this.image);
            param.append('sumnail', this.sumnail);
            param.append('desc', this.desc);
            param.append('title', this.title);
            param.append('content', this.content);
            param.append('tags', this.tags);
            param.append('sec', this.sec);

            try {
                const id = this.$route.params.id;
                const res = await editPostById(id, param);
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
        createImage(file) {
            if (!file) return;
            var reader = new FileReader();
            reader.onload = e => {
                this.base64 = e.target.result;
            };
            reader.readAsDataURL(file);
        },
    },
    computed: {
        addressCompile() {
            const imgPath = this.sumnail
                ? this.base64
                : this.image
                ? imagePath(this.image)
                : '';
            return imgPath;
        },
    },
    async created() {
        const id = this.$route.params.id;
        const { data } = await fetchPostById(id);
        this.setForm(data);
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
