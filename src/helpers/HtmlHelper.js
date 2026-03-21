import React from 'react'

class Node {
    constructor(tag, options, parent) {
        this.tag = tag;
        this.parent = parent;
        this.children = [];
        this.options = options;
        this.text = '';
        this.className = options['class'];
        delete options['class'];

        if (parent !== null) {
            parent.addChild(this);
        }
    }

    addChild(child) {
        if (this.text.length > 0) {
            this.children.push(this.text);
            this.text = '';
        }

        this.children.push(child);
    }

    addText(text) {
        let closeTag = '<\/' + this.tag + '>', 
            stack = text.split(closeTag), 
            mine = stack.shift();

        if (this.children.length > 0) {
            this.children.push(mine);
        } else {
            this.text = mine;
        }

        if (stack.length > 0 && this.parent !== null) {
            return this.parent.addText(stack.join(closeTag));
        }

        return this;
    }

    generate() {
        let Tag = this.tag;
        if (this.children.length > 0) {
            return <Tag {...this.options} className={this.className}>{this.children.map((child, index) => typeof child === 'string' ? <span key={'text_' + index}>{child}</span> : child.generate())}</Tag>;
        } else {
            return <Tag {...this.options} className={this.className}>{this.text}</Tag>;
        }
    }
}

const tags = ['small', 'div', 'span', 'ul', 'li', 'h4', 'p', 'a', 'section', 'iframe'];

const parseOptions = options => {
    let result = {};
    if (options && options.length > 0) {
        options.split(' ')
            .forEach(option => {
                let match = option.match(/(\w+)\s*=\s*"([^"]+)"/);
                if (match !== null) {
                    result[match[1]] = match[2];
                }
            });
    }
    return result;
}

export default html => {
    let segments = html.split(/<(\w+\s*[^>]*)>/), current = null;
    segments.shift(); // Ignore the text before the first tag

    segments.forEach(segment => {
        let stack = segment.split(' ');
        if (tags.indexOf(stack[0]) >= 0) {
            current = new Node(stack[0], parseOptions(stack.slice(1).join(' ')), current);
        } else if (current !== null) {
            current = current.addText(segment);
        }
    });

    return current.generate();
}
