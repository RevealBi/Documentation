

export interface Component {
    name: string;
    properties: Property[];
    methods: Method[];
}

export interface Property {
    name: string;
    type: string;
    description: string;
    defaultValue: string | null;
}

export interface Method {
    name: string;
    description: string;
}

const fetchFileContents = async (path: string) => {
    try {
        const response = await fetch(`https://api.github.com/repos/RevealBi/revealbi-ui/contents/packages/ui/src/components/${path}`);
        const data = await response.json();
        if (data && data.content) {
            return atob(data.content);
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const parseComponentFile = async (path: string) => {
    const contents = await fetchFileContents(path);
    if (!contents) {
        return null;
    }

    //todo: parse contents
    return contents;
}