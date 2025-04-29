export default {
    newToDoPayload: (title, doneStatus, description) => {
        return {
            "title": `${title}`,
            "doneStatus": Boolean(doneStatus),
            "description": `${description}`
        }
    },
    updatePayload: (id, title, doneStatus, description) => {
        return {
            "id": Number(id),
            "title": `${title}`,
            "doneStatus": Boolean(doneStatus),
            "description": `${description}`,
        }
    },
    updateDescriptionPayload: (description) => {
        return {
            "description": `${description}`
        }
    }
}