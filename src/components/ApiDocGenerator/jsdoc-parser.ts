export interface JsDoc {
    description: string;
    example?: string;
    params?: JsDocParam[];
    returns?: string;
}

export interface JsDocParam {
    name: string;
    description: string;
}

const removeCommentSyntax = (comment: string): string[] => {
    return comment
        .replace(/^\/\*\*/, '') // Remove leading /**
        .replace(/\*\/$/, '')   // Remove trailing */
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')); // Remove leading * and optional whitespace
};

const parseDescription = (lines: string[]): string => {
    const descriptionLines: string[] = [];
    for (const line of lines) {
        if (line.trim().startsWith('@')) {
            break;
        }
        if (line.trim() !== '') {
            descriptionLines.push(line);
        }
    }
    return descriptionLines.join(' ').trim();
};

const parseParams = (lines: string[]): JsDocParam[] => {
    const params: JsDocParam[] = [];
    for (const line of lines) {
        if (line.trim().startsWith('@param')) {
            const match = line.match(/@param\s+(\w+)\s+-?\s*(.*)/);
            if (match) {
                const [, name, description] = match;
                params.push({ name, description });
            }
        }
    }
    return params;
};

const parseReturns = (lines: string[]): string | null => {
    for (const line of lines) {
        if (line.trim().startsWith('@returns')) {
            const match = line.match(/@returns?\s+-?\s*(.*)/);
            if (match) {
                return match[1].trim();
            }
        }
    }
    return null;
};

const parseExample = (lines: string[]): string | null => {
    const exampleLines: string[] = [];
    let inExampleBlock = false;

    for (const line of lines) {
        if (line.trim().startsWith('@example')) {
            inExampleBlock = true;
            continue;
        }

        if (inExampleBlock) {
            if (line.trim().startsWith('```')) {
                if (exampleLines.length > 0) {
                    inExampleBlock = !inExampleBlock;
                    continue;
                } else {
                    // Start of code block, skip the line with ```
                    continue;
                }
            }
            exampleLines.push(line);
        }
    }
    return exampleLines.length > 0 ? exampleLines.join('\n').trim() : null;
};

export const parseJsDocs = (comment: string): JsDoc => {
    const lines = removeCommentSyntax(comment);
    const description = parseDescription(lines);
    const params = parseParams(lines);
    const returns = parseReturns(lines);
    const example = parseExample(lines);

    return {
        description,
        params,
        returns,
        example,
    };
};
