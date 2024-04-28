ServerEvents.recipes(event => {
    event.remove({input: '#forge:ores', output: '#forge:ingots'})
    event.remove({input: '#forge:ores', output: '#forge:dusts'})
    // Create的粉碎矿石
    event.remove({input: '#create:crushed_raw_materials'})
    event.remove({output: '#create:crushed_raw_materials'})
    // 富集仓：矿->2粉
    // event.remove({input: '#forge:ores', type: 'mekanism:enriching'})
    // 沉浸电弧炉：矿->2锭
    // event.remove({input: '#forge:ores', type: 'immersiveengineering:arc_furnace'})
    // 沉浸粉碎机：矿->2粉
    // event.remove({input: '#forge:ores', type: 'immersiveengineering:crusher'})

    // 拆解台
    event.remove({output: 'twilightforest:uncrafting_table'})
})