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

const tags = ['small', 'div', 'span', 'ul', 'li', 'h4', 'p', 'a', 'section', 'iframe', 'img', 'br'];

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
    const tokenRegex = /<(\/?)(\w+)\s*([^>]*)>|([^<]+)/g;
    let current = null;
    let root = null;
    let match;
    
    while ((match = tokenRegex.exec(html)) !== null) {
        if (match[4]) {
            // Text content
            let text = match[4];
            if (text.trim().length > 0 && current !== null) {
                current = current.addText(text);
            }
        } else {
            let isClosing = match[1] === '/';
            let tagName = match[2];
            let attrs = match[3].trim();
            let isSelfClosing = attrs.endsWith('/');
            if (isSelfClosing) {
                attrs = attrs.slice(0, -1).trim();
            }
            
            if (tags.indexOf(tagName) >= 0) {
                if (isClosing) {
                    if (current && current.tag === tagName) {
                        current = current.parent;
                    }
                } else if (isSelfClosing) {
                    if (current) {
                        new Node(tagName, parseOptions(attrs), current);
                    }
                } else {
                    if (!root) {
                        root = new Node(tagName, parseOptions(attrs), null);
                        current = root;
                    } else {
                        current = new Node(tagName, parseOptions(attrs), current);
                    }
                }
            } else if (current !== null) {
                current = current.addText(match[0]);
            }
        }
    }

    return root ? root.generate() : null;
}
