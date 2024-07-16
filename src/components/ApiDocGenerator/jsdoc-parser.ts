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

export const parseJsDocs = (comment: string): JsDoc => {
    const lines = comment
        .replace(/^\/\*\*/, '') // Remove leading /**
        .replace(/\*\/$/, '')   // Remove trailing */
        .split('\n')
        .map(line => line.replace(/^\s*\*\s?/, '')); // Remove leading * and optional whitespace

    const descriptionLines: string[] = [];
    const params: JsDocParam[] = [];
    let returns: string | null = null;
    let exampleLines: string[] = [];
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
        } else if (line.trim().startsWith('@param')) {
            const match = line.match(/@param\s+(\w+)\s+-?\s*(.*)/);
            if (match) {
                const [, name, description] = match;
                params.push({ name, description });
            }
        } else if (line.trim().startsWith('@returns')) {
            const match = line.match(/@returns?\s+-?\s*(.*)/);
            if (match) {
                returns = match[1].trim();
            }
        } else if (line.trim().startsWith('@')) {
            // Ignore other tags
            continue;
        } else {
            if (line.trim() !== '') {
                descriptionLines.push(line);
            }
        }
    }

    return {
        description: descriptionLines.join(' ').trim(),
        params: params,
        returns: returns,
        example: exampleLines.length > 0 ? exampleLines.join('\n').trim() : null,
    };
};