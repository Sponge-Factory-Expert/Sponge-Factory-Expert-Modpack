ItemEvents.tooltip(event => {
    event.addAdvanced('ars_nouveau:source_gem', (item, advanced, text) => {
        text.remove(1)
    })
})