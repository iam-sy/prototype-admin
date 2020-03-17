<template>
    <div class="code-viewer markdown-body">
        <h1 content="code-viewer__title" v-if="title">{{ title }}</h1>
        <div class="board-write__pre-tags" v-if="tags.length > 0">
            <span type="button" v-for="(tag, index) in tags" :key="index">
                # {{ tag }}
            </span>
        </div>
        <div class="board-write__pre-content" v-html="parseHtml"></div>
    </div>
</template>

<script>
import marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/components/prism-css.min';
import 'prismjs/components/prism-python.min';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-twig.min';
import 'prismjs/components/prism-tsx.min';

export default {
    props: ['tags', 'title', 'content'],
    computed: {
        parseHtml() {
            marked.setOptions({
                breaks: true,
                highlight(code, lang) {
                    return Prism.highlight(
                        code,
                        Prism.languages[lang] || Prism.languages.markup,
                        lang,
                    );
                },
            });

            return marked(this.content);
        },
    },
};
</script>

<style scoped></style>
