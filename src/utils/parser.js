import constants from '../../common/config';
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

const imagePath = path => {
    const url = `${constants.apiAdress}${path}`;
    return url;
};

const formatDate = value => {
    const date = new Date(value);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    const day = date.getDate();
    let hours = date.getHours();
    hours = hours > 9 ? hours : `0${hours}`;
    const minutes = date.getMinutes();
    return `${year}.${month}.${day}`;
};

const parseHtml = content => {
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

    return marked(content);
};

const parseHeadings = content => {
    const html = parseHtml(content);
    const div = document.createElement('div');
    div.innerHTML = html;
    const elements = Array.from(div.children);
    const headings = elements.filter(el => el.tagName.match(/H([1-3])/));
    const headingsInfo = headings.map(heading => ({
        id: heading.id,
        text: heading.textContent,
        level: parseInt(heading.tagName.replace('H', ''), 10),
    }));
    const minLevel = Math.min(
        ...Array.from(headingsInfo.map(info => info.level)),
    );
    headingsInfo.forEach(info => {
        info.level -= minLevel;
    });
    return headingsInfo;
};
export { imagePath, formatDate, parseHtml, parseHeadings };
