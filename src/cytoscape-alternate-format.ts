export function fromNeo4j(data: any): any {
    console.log("inside conversion function");

    return {
        nodes: data.nodes.map((x: any) => {
            return {
                data: { id: x.id }
            }
        }),
        edges: data.relationships.map((x: any) => {
            return {
                data: {
                    id: x.id,
                    source: x.startNode,
                    target: x.endNode
                }
            }
        })
    };
}
