ServerEvents.recipes(event => {
    event.remove({input: '#forge:ores', output: '#forge:ingots'})
    event.remove({input: '#forge:ores', output: '#forge:dusts'})
    event.remove({input: '#forge:ores', output: '#forge:raw_materials'})
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

    addGeneratedOreRecipes(event, "copper")
    addGeneratedOreRecipes(event, "iron")
    // 锌
    addOreWashingRecipes(event, "zinc")
    addOreGroundRecipes(event, "zinc")
    addCharcoalDustMixture(event, "zinc")
    event.smelting("create:raw_" + "zinc", "spongefactory:charcoal_" + "zinc" + "_ore_mixture")
    // 金
    addOreWashingRecipes(event, "gold")
    addOreGroundRecipes(event, "gold")
    event.smelting("minecraft:raw_" + "gold", "spongefactory:ground_" + "gold" + "_ore")
    // 银
    addOreWashingRecipes(event, "silver")
    addOreGroundRecipes(event, "silver")
    addCharcoalDustMixture(event, "silver")
    event.smelting("thermal:raw_" + "silver", "spongefactory:charcoal_" + "silver" + "_ore_mixture")
    // 锇
    addOreWashingRecipes(event, "osmium")
    addOreGroundRecipes(event, "osmium")
    // TODO: 后续加上用氢气还原镍
    // 锡
    addOreWashingRecipes(event, "tin")
    addOreGroundRecipes(event, "tin")
    addCharcoalDustMixture(event, "tin")
    event.smelting("thermal:raw_" + "tin", "spongefactory:charcoal_" + "tin" + "_ore_mixture")
    // 镍
    addOreWashingRecipes(event, "nickel")
    addOreGroundRecipes(event, "nickel")
    // TODO: 后续加上用化学方法冶炼镍
    // 铝
    addOreWashingRecipes(event, "aluminum")
    addOreGroundRecipes(event, "aluminum")
    // TODO: 后续加上电解冶炼铝
    // 铅
    addOreWashingRecipes(event, "lead")
    addOreGroundRecipes(event, "lead")
    addCharcoalDustMixture(event, "lead")
    event.smelting("thermal:raw_" + "lead", "spongefactory:charcoal_" + "lead" + "_ore_mixture")
    // 铀
    addOreWashingRecipes(event, "uranium")
    addOreGroundRecipes(event, "uranium")
    // TODO: 后续加上萃取炼铀

    // 生石灰
    event.custom({
        "type": "lychee:item_burning",
        "item_in": {"tag": "forge:limestone"},
        "post": {"type": "drop_item", "item": "spongefactory:quicklime"}
    })

    // 熟石灰
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:quicklime"},
        "block_in": {"blocks": ["minecraft:water"]},
        "post": [{"type": "drop_item", "item": "spongefactory:slaked_lime"}, {"type": "place", "block": "air"}]
    })
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:quicklime"},
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": [{"type": "drop_item", "item": "spongefactory:slaked_lime"}, {"type": "place", "block": "cauldron"}]
    })
    event.recipes.create.splashing("spongefactory:slaked_lime", "spongefactory:quicklime")

    // 石锤
    event.shaped(Item.of('spongefactory:stone_hammer', 1), [' SA', ' TS', 'T  '], {
        A: "minecraft:string", S: '#quark:stone_tool_materials', T: '#twilightforest:uncrafting_ignores_cost'
    })
    // 木炭粉
    event.shapeless('mekanism:dust_charcoal', [Item.of('minecraft:charcoal'), '#spongefactory:hammer'])
        .customIngredientAction('#spongefactory:hammer', "use_hammer")
    // 用于扣除石锤的耐久
    Ingredient.registerCustomIngredientAction("use_hammer", (itemstack, index, inventory) => {
        let hammer_nbt;
        try {
            hammer_nbt = inventory.extractItem(inventory.find(Item.of('spongefactory:stone_hammer')), 1, false).getNbt()
        } catch (e) {
            hammer_nbt = inventory.extractItem(inventory.find(Item.of('immersiveengineering:hammer')), 1, false).getNbt()
        }
        hammer_nbt.Damage += 1
        itemstack.nbt = itemstack.nbt.merge(hammer_nbt)
        return itemstack
    })

    // 熔炉内衬
    event.custom({
        "type": "lychee:item_inside",
        "item_in": [{
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "minecraft:terracotta"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }],
        "block_in": {"blocks": ["minecraft:water"]},
        "post": {"type": "drop_item", "item": "spongefactory:furnace_lining"}
    })
    event.custom({
        "type": "lychee:item_inside",
        "item_in": [{
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "spongefactory:slaked_lime"
        }, {
            "item": "minecraft:terracotta"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }, {
            "item": "minecraft:clay_ball"
        }],
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": {"type": "drop_item", "item": "spongefactory:furnace_lining"}
    })

    // 三种熔炉
    event.remove({output: "quark:blackstone_furnace"})
    event.remove({output: "quark:deepslate_furnace"})
    event.remove({output: "minecraft:furnace"})
    event.shaped(Item.of('minecraft:furnace', 1), ['XXX', 'XAX', 'XXX'], {
        X: "#forge:cobblestone", A: 'spongefactory:furnace_lining'
    })
    event.shaped(Item.of('minecraft:furnace', 1), ['XXX', 'XAX', 'XXX'], {
        X: "#blue_skies:cobblestone", A: 'spongefactory:furnace_lining'
    })
    event.shaped(Item.of('quark:blackstone_furnace', 1), ['XXX', 'XAX', 'XXX'], {
        X: "minecraft:blackstone", A: 'spongefactory:furnace_lining'
    })
    event.shaped(Item.of('quark:deepslate_furnace', 1), ['XXX', 'XAX', 'XXX'], {
        X: "minecraft:cobbled_deepslate", A: 'spongefactory:furnace_lining'
    })

    // 砂纸
    event.remove({output: 'create:red_sand_paper'})
    event.remove({output: 'create:sand_paper'})
    event.remove({output: 'createaddition:diamond_grit_sandpaper'})
    event.shapeless('create:sand_paper', ['minecraft:paper', 'occultism:tallow', '#forge:sand/colorless'])
    event.shapeless('create:red_sand_paper', ['minecraft:paper', 'occultism:tallow', '#forge:dusts/diamond'])
    event.shapeless('createaddition:diamond_grit_sandpaper', ['minecraft:paper', 'occultism:tallow', 'minecraft:red_sand'])

    // 刚玉
    event.recipes.create.sandpaper_polishing('spongefactory:polished_red_corundum', 'quark:red_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_violet_corundum', 'quark:violet_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_white_corundum', 'quark:white_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_yellow_corundum', 'quark:yellow_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_black_corundum', 'quark:black_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_blue_corundum', 'quark:blue_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_indigo_corundum', 'quark:indigo_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_green_corundum', 'quark:green_corundum_cluster')
    event.recipes.create.sandpaper_polishing('spongefactory:polished_orange_corundum', 'quark:orange_corundum_cluster')

    // 所有使用磨制玫瑰石英的换成刚玉
    event.replaceInput({}, 'create:polished_rose_quartz', '#spongefactory:polished_corundum')
    // 删除磨制玫瑰石英的配方
    event.remove({output: 'create:polished_rose_quartz'})

    // 耐应力构件
    event.shaped(Item.of('spongefactory:stress_endurance_mechanism', 1), ['XXX', 'XAX', 'XXX'], {
        X: "#forge:nuggets/iron", A: '#spongefactory:polished_corundum'
    })
    // 抗应力构件
    event.custom({
        "type": "naturesaura:altar",
        "input": {
            "item": "spongefactory:stress_endurance_mechanism"
        },
        "output": {
            "item": "spongefactory:stress_resistance_mechanism"
        },
        "aura": 15000,
        "time": 80
    })
    // 顺压力构件
    event.shaped(Item.of('spongefactory:yielding_mechanism', 1), ['XXX', 'XAX', 'XXX'], {
        X: "#forge:nuggets/zinc", A: 'spongefactory:stress_resistance_mechanism'
    })
    // 传动杆
    event.remove({output: 'create:shaft'})
    event.shaped(Item.of('create:shaft', 6), [' X ', ' A ', ' X '], {
        X: "#forge:nuggets/zinc", A: 'spongefactory:stress_endurance_mechanism'
    })
    // 齿轮
    event.remove({output: 'create:cogwheel'})
    event.shapeless('create:cogwheel', ['spongefactory:stress_endurance_mechanism', '#minecraft:planks'])
    event.remove({id: 'create:crafting/kinetics/large_cogwheel'})

    // 安山合金
    event.remove({output: "create:andesite_alloy", input: "minecraft:andesite"})
    event.shapeless('create:andesite_alloy', ['3x minecraft:andesite', '3x #forge:nuggets/zinc'])
    event.recipes.thermal.smelter('create:andesite_alloy', ['3x minecraft:andesite', '3x #forge:nuggets/zinc'])

    // 动力辊轧机
    event.replaceInput({output: 'create:mechanical_press'}, 'create:shaft', 'spongefactory:stress_endurance_mechanism')

    // 水车 风车轴承 飞轮
    event.replaceInput({output: 'immersiveengineering:watermill'}, '#ad_astra_platform:steel_ingots', 'spongefactory:stress_resistance_mechanism')
    event.replaceInput({output: 'create:water_wheel'}, 'create:shaft', 'spongefactory:stress_resistance_mechanism')
    event.replaceInput({output: 'create:windmill_bearing'}, 'create:shaft', 'spongefactory:stress_resistance_mechanism')
    event.replaceInput({output: 'create:flywheel'}, 'create:shaft', 'spongefactory:stress_resistance_mechanism')
    // 蒸汽引擎
    event.replaceInput({output: 'create:steam_engine'}, 'create:andesite_alloy', 'spongefactory:stress_resistance_mechanism')

    // 工作盆
    event.remove({output: 'create:basin'})
    event.shaped(Item.of('create:basin', 1), ['A A', 'A A', 'AAA'], {
        A: 'create:andesite_alloy'
    })

    // 搅拌器
    event.remove({output: "create:whisk"})
    event.shaped(Item.of('create:whisk', 1), [' O ', 'MXM', 'MMM'], {
        O: 'create:andesite_alloy', X: 'spongefactory:yielding_mechanism', M: 'thermal:iron_plate'
    })

    // 耐高温内衬
    event.recipes.create.mixing('spongefactory:high_temperature_resistant_lining', [Fluid.water(500), '4x spongefactory:slaked_lime', 'spongefactory:furnace_lining'])
    // 空的烈焰人燃烧室
    event.remove({output: "create:empty_blaze_burner"})
    event.shaped(Item.of('create:empty_blaze_burner', 1), ['PPP', 'MXM', 'POP'], {
        O: 'minecraft:netherrack',
        X: 'spongefactory:high_temperature_resistant_lining',
        P: 'thermal:iron_plate',
        M: 'minecraft:iron_bars'
    })

    // 吸附-脱附负焓变循环催化剂
    event.recipes.create.mixing('spongefactory:negative_enthalpy_change_cycle_catalyst', [
        'spongefactory:polished_red_corundum',
        'spongefactory:polished_violet_corundum',
        'spongefactory:polished_white_corundum',
        'spongefactory:polished_yellow_corundum',
        'spongefactory:polished_black_corundum',
        'spongefactory:polished_blue_corundum',
        'spongefactory:polished_indigo_corundum',
        'spongefactory:polished_green_corundum',
        'spongefactory:polished_orange_corundum'
    ]).superheated()

    // 神秘元质内衬
    event.remove({output: 'minecraft:enchanted_golden_apple', type: 'minecraft:crafting_shaped'})
    event.recipes.create.mixing('spongefactory:mysterium_lining',
        [
            '4x spongefactory:negative_enthalpy_change_cycle_catalyst',
            '4x minecraft:nether_star',
            '4x minecraft:netherite_ingot',
            '4x minecraft:enchanted_golden_apple',
            'spongefactory:high_temperature_resistant_lining'
        ]
    ).superheated()

    // 轧机
    event.remove({output: 'createaddition:rolling_mill'})
    event.shaped(Item.of('createaddition:rolling_mill', 1), ['APA', 'BPC', 'DXD'], {
        A: 'thermal:iron_plate',
        P: 'create:shaft',
        B: 'spongefactory:stress_resistance_mechanism',
        C: 'spongefactory:yielding_mechanism',
        D: 'create:andesite_alloy',
        X: 'create:andesite_casing'
    })

    event.remove({output: '#forge:wires/copper', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:rods/iron', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:rods/iron', type: 'minecraft:crafting_shaped'})

    // 电子管
    event.remove({output: 'create:electron_tube'})
    event.shaped(Item.of('create:electron_tube', 1),
        [
            ' X ',
            'ZWI',
            'PPP'], {
            P: '#forge:plates/iron',
            X: '#spongefactory:polished_corundum',
            Z: '#forge:plates/zinc',
            W: '#forge:wires/copper',
            I: '#forge:rods/iron'
        })

    // 机械手零部件
    event.remove({output: 'create:brass_hand'})
    event.shaped(Item.of('create:brass_hand', 1),
        [
            ' X ',
            'PPP',
            ' P '], {
            P: '#forge:plates/brass',
            X: 'spongefactory:yielding_mechanism'
        }
    )

    // 粉碎轮
    event.remove({output: 'create:crushing_wheel'})
    event.custom({
        "type": "create:mechanical_crafting",
        "acceptMirrored": false,
        "key": {
            "A": {
                "item": "create:andesite_alloy"
            },
            "P": {
                "tag": "minecraft:planks"
            },
            "S": {
                "item": "spongefactory:stress_endurance_mechanism"
            }
        },
        "pattern": [
            " AAA ",
            "AAPAA",
            "APSPA",
            "AAPAA",
            " AAA "
        ],
        "result": {
            "count": 2,
            "item": "create:crushing_wheel"
        }
    })

    // 蛋糕
    event.replaceInput({output: 'minecraft:cake'}, 'minecraft:sugar', 'create_confectionery:white_chocolate_glazed_marshmallow')
    event.replaceInput({output: 'createaddition:cake_base'}, 'minecraft:sugar', 'create_confectionery:white_chocolate_glazed_marshmallow')

    // 烈焰蛋糕坯
    event.remove({output: 'create:blaze_cake_base'})
    event.recipes.create.compacting('create:blaze_cake_base', ['#forge:eggs', 'create_confectionery:white_chocolate_glazed_marshmallow', 'create:cinder_flour', 'spongefactory:high_temperature_resistant_lining'])

    // 烈焰蛋糕
    event.remove({output: 'create:blaze_cake'})
    const blazeCakeBase = 'create:blaze_cake_base'
    event.recipes.create.sequenced_assembly('create:blaze_cake', blazeCakeBase, [
        event.recipes.createDeploying(blazeCakeBase, [blazeCakeBase, 'spongefactory:high_temperature_resistant_lining']).keepHeldItem(),
        event.recipes.createDeploying(blazeCakeBase, [blazeCakeBase, 'minecraft:blaze_powder']),
        event.recipes.createDeploying(blazeCakeBase, [blazeCakeBase, 'minecraft:cake']),
        event.recipes.createFilling(blazeCakeBase, [Fluid.lava(1000), blazeCakeBase]),
        event.recipes.createDeploying(blazeCakeBase, [blazeCakeBase, 'minecraft:blaze_powder'])
    ]).transitionalItem(blazeCakeBase).loops(1)

    // 溜槽
    event.replaceInput({output: 'create:chute'}, 'minecraft:iron_ingot', 'minecraft:hopper')

    // 漏斗
    event.remove({output: 'minecraft:hopper'})
    event.shaped(Item.of('minecraft:hopper', 1),
        [
            'IPI',
            'IBI',
            ' I '], {
            B: '#forge:chests',
            P: 'create:precision_mechanism',
            I: 'minecraft:iron_ingot'
        }
    )

    // 万向漏斗
    event.remove({output: 'pneumaticcraft:omnidirectional_hopper'})
    event.shaped(Item.of('pneumaticcraft:omnidirectional_hopper', 1),
        [
            'IPI',
            'IBI',
            ' I '], {
            B: '#forge:chests',
            P: 'create:precision_mechanism',
            I: 'pneumaticcraft:ingot_iron_compressed'
        }
    )

    // 黄铜漏斗
    event.replaceInput({output: 'create:brass_funnel'}, 'minecraft:dried_kelp', 'create:andesite_funnel')

    // 安山漏斗
    event.remove({output: 'create:andesite_funnel'})
    event.shaped(Item.of('create:andesite_funnel', 2),
        [
            'A',
            'B',
            'C'], {
            A: 'create:andesite_alloy',
            B: 'minecraft:dried_kelp',
            C: 'minecraft:hopper'
        }
    )

    // 扇叶
    event.replaceInput({output: 'create:propeller'}, 'create:andesite_alloy', 'create:precision_mechanism')

    // 鼓风机
    event.replaceInput({output: 'create:encased_fan'}, 'create:propeller', 'create_sa:fan_component')

    // 灌注室
    event.remove({output: 'ars_nouveau:imbuement_chamber'})
    event.shaped(Item.of('ars_nouveau:imbuement_chamber', 1),
        [
            'PXP',
            'X X',
            'PPP'], {
            X: '#forge:ingots/brass',
            P: 'minecraft:smooth_stone'
        }
    )

    // 魔源罐
    event.remove({output: 'ars_nouveau:source_jar'})
    event.shaped(Item.of('ars_nouveau:source_jar', 1),
        [
            'PXP',
            'GGG',
            'XPX'], {
            X: '#forge:ingots/brass',
            P: 'minecraft:smooth_stone',
            G: '#forge:glass'
        }
    )

    // 火山魔源通道
    event.remove({output: 'ars_nouveau:volcanic_sourcelink'})
    event.shaped(Item.of('ars_nouveau:volcanic_sourcelink', 1),
        [
            ' G ',
            'XPX',
            'XBX'], {
            X: '#forge:ingots/brass',
            P: 'create:blaze_cake',
            G: 'ars_nouveau:source_gem',
            B: 'ars_nouveau:source_gem_block'
        }
    )

    // 魔源中继器
    event.remove({output: 'ars_nouveau:relay'})
    event.shaped(Item.of('ars_nouveau:relay', 1),
        [
            'X X',
            'BGB',
            'X X'], {
            X: '#forge:ingots/brass',
            G: 'ars_nouveau:source_gem_block',
            B: '#forge:ingots/gold'
        }
    )

    // 奥术基座
    event.replaceInput({output: 'ars_nouveau:arcane_pedestal'}, 'minecraft:gold_nugget', '#forge:nuggets/brass')

    // 附魔装置
    event.replaceInput({output: 'ars_nouveau:enchanting_apparatus'}, 'minecraft:gold_nugget', '#forge:nuggets/brass')
    event.replaceInput({output: 'ars_nouveau:enchanting_apparatus'}, 'minecraft:gold_ingot', '#forge:ingots/brass')

    // 魔源宝石
    event.remove({output: 'ars_nouveau:source_gem', type: 'ars_nouveau:imbuement'})
    event.remove({output: 'ars_nouveau:source_gem_block', type: 'ars_nouveau:imbuement'})
    event.custom({
        "type": "ars_nouveau:imbuement",
        "count": 1,
        "input": {
            "tag": "spongefactory:polished_corundum"
        },
        "output": "ars_nouveau:source_gem",
        "pedestalItems": [],
        "source": 500
    })
    event.custom({
        "type": "ars_nouveau:imbuement",
        "count": 1,
        "input": {
            "tag": "forge:gems/diamond"
        },
        "output": "ars_nouveau:source_gem",
        "pedestalItems": [],
        "source": 500
    })

    // 熔岩水莲
    event.remove({output: 'ars_nouveau:lava_lily'})

    // 笔与墨
    event.shapeless('spongefactory:scribing_tools', ['minecraft:black_dye', 'minecraft:glass_bottle', '#forge:feathers'])
    // 抄写台
    event.remove({output: 'ars_nouveau:scribes_table'})
    event.shaped(Item.of('ars_nouveau:scribes_table', 1),
        [
            'B  ',
            'AAA',
            'CCC'], {
            B: 'spongefactory:scribing_tools',
            A: 'ars_nouveau:lava_lily',
            C: 'ars_nouveau:archwood_slab'
        }
    )

    // 气之精华
    event.remove({output: 'ars_nouveau:air_essence'})
    event.recipes.ars_nouveau.imbuement(
        "#forge:gems/source",
        "ars_nouveau:air_essence",
        2000,
        [
            "minecraft:feather",
            "ars_nouveau:wilden_wing",
            'alexsmobs:stink_bottle',
            'botania:ender_air_bottle',
            'quark:bottled_cloud',
            'naturesaura:bottle_two_the_rebottling',
            'minecraft:dragon_breath',
            'minecraft:glass_bottle'
        ]
    )

    // 土之精华
    event.remove({output: 'ars_nouveau:earth_essence'})
    event.remove({output: 'minecraft:mud', type: 'create:mixing'})
    event.recipes.ars_nouveau.imbuement(
        "#forge:gems/source",
        'ars_nouveau:earth_essence',
        2000,
        [
            'minecraft:dirt',
            'immersiveengineering:concrete',
            'minecraft:soul_soil',
            'minecraft:dirt_path',
            'minecraft:podzol',
            'minecraft:mycelium',
            'minecraft:mud',
            '#forge:concrete_powders'
        ]
    )

    // 水之精华
    event.remove({output: 'ars_nouveau:water_essence'})
    event.recipes.ars_nouveau.imbuement(
        "#forge:gems/source",
        'ars_nouveau:water_essence',
        2000,
        [
            'minecraft:wet_sponge',
            'minecraft:water_bucket',
            'minecraft:sea_lantern',
            'minecraft:lily_pad',
            'minecraft:sea_pickle',
            'aquaculture:neptunium_ingot',
            'minecraft:conduit',
            'minecraft:blue_ice'
        ]
    )

    // 火之精华
    event.remove({output: 'ars_nouveau:fire_essence'})
    event.recipes.ars_nouveau.imbuement(
        "#forge:gems/source",
        'ars_nouveau:fire_essence',
        2000,
        [
            'minecraft:flint_and_steel',
            'minecraft:fire_charge',
            'reliquary:molten_core',
            'minecraft:magma_block',
            'minecraft:lava_bucket',
            'spongefactory:high_temperature_resistant_lining',
            'create:blaze_burner',
            'create:blaze_cake'
        ]
    )

    // 操纵之精华
    event.remove({output: 'ars_nouveau:manipulation_essence'})
    event.recipes.ars_nouveau.imbuement(
        "#forge:gems/source",
        'ars_nouveau:manipulation_essence',
        2000,
        [
            "ars_nouveau:fire_essence",
            "ars_nouveau:water_essence",
            "ars_nouveau:earth_essence",
            "ars_nouveau:air_essence",
            "#forge:tools/wrench"
        ]
    )

    // 法术书
    event.remove({output: 'ars_nouveau:novice_spell_book', input: 'minecraft:book'})
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            "ars_nouveau:fire_essence",
            "ars_nouveau:water_essence",
            "ars_nouveau:earth_essence",
            "ars_nouveau:air_essence",
        ],
        "minecraft:book",
        "ars_nouveau:novice_spell_book",
        3000,
    );

    // 精密构件
    event.remove({output: 'create:precision_mechanism'})
    const glyphCraft = 'naturesaura:sky_ingot'
    event.recipes.create.sequenced_assembly('create:precision_mechanism', glyphCraft, [
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'create:brass_sheet']),
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'create:cogwheel']),
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'create:wrench']).keepHeldItem(),
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'create:large_cogwheel']),
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'create:wrench']).keepHeldItem(),
        event.recipes.createDeploying(glyphCraft, [glyphCraft, 'minecraft:iron_nugget']),
    ]).transitionalItem(glyphCraft).loops(5)

    // 砖窑
    event.remove({output: 'immersiveengineering:alloybrick', not: {input: 'immersiveengineering:slab_alloybrick'}})

    // 砖窑台阶
    const brick = 'minecraft:brick'
    event.recipes.create.sequenced_assembly('immersiveengineering:slab_alloybrick', brick, [
        event.recipes.createDeploying(brick, [brick, 'minecraft:clay_ball']),
        event.recipes.createDeploying(brick, [brick, 'spongefactory:high_temperature_resistant_lining']),
        event.recipes.createDeploying(brick, [brick, 'occultism:crushed_end_stone'])
    ]).transitionalItem(brick).loops(1)

    // 青金石变海晶沙砾/碎片
    event.remove({id: 'create:haunting/lapis_recycling'})
    // 命名牌
    event.remove({id: 'create_sa:book_and_quill_haunting'})

    // 火焰弹做合金
    event.remove({input: 'minecraft:fire_charge', output: '#forge:ingots'})

    // 无序合成的合金粉
    event.remove({output: '#forge:dusts/bronze', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/shellite', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/electrum', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/invar', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/constantan', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/rose_gold', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/soul_infused', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/twinite', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/dragonsteel', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/signalum', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/lumium', type: 'minecraft:crafting_shapeless'})
    event.remove({output: '#forge:dusts/enderium', type: 'minecraft:crafting_shapeless'})

    // 铁锭烧钢锭
    event.remove({id: 'ad_astra:recipes/steel_ingot_from_blasting_iron_ingot'})
    // 混合搅拌康铜/琥珀金
    event.remove({id: 'createaddition:compat/immersiveengineering/constantan'})
    event.remove({id: 'createaddition:mixing/electrum'})
    // 多余的琥珀金粒到锭
    event.remove({id: 'immersiveengineering:crafting/nugget_electrum_to_ingot_electrum'})

    // 板通过剪线钳到线
    event.remove({input: 'immersiveengineering:wirecutter', output: '#forge:wires'})

    // 异界琥珀金
    event.custom({
        "type": "occultism:spirit_fire",
        "ingredient": {
            "item": 'thermal:electrum_ingot'
        },
        "result": {
            "item": 'spongefactory:otherworld_electrum_ingot'
        }
    })

    // 金纤维
    event.replaceInput({output: 'naturesaura:gold_fiber'}, 'minecraft:gold_nugget', 'minecraft:golden_apple')

    // 屠刀
    event.remove({output: 'occultism:butcher_knife'})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "item": 'minecraft:iron_sword'
            },
            {
                "item": "minecraft:iron_ingot"
            },
            {
                "tag": 'forge:rods/wooden'
            },
            {
                "tag": 'forge:rods/wooden'
            },
            {
                "tag": 'forge:rods/wooden'
            },
            {
                "item": "minecraft:iron_ingot"
            }
        ],
        "sapling": {
            "item": "minecraft:oak_sapling"
        },
        "output": {
            "item": "occultism:butcher_knife",
            "count": 1
        },
        "time": 200
    })

    // 自然祭坛
    event.remove({output: 'naturesaura:nature_altar'})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "item": 'minecraft:stone'
            },
            {
                "item": 'minecraft:stone'
            },
            {
                "item": 'minecraft:stone'
            },
            {
                "item": "naturesaura:gold_leaf"
            },
            {
                "item": 'naturesaura:token_fear'
            },
            {
                "item": "naturesaura:token_joy"
            },
            {
                "item": 'minecraft:glistering_melon_slice'
            },
            {
                "item": 'minecraft:gold_block'
            }
        ],
        "sapling": {
            "item": 'minecraft:jungle_sapling'
        },
        "output": {
            "item": 'naturesaura:nature_altar',
            "count": 1
        },
        "time": 200
    })

    // 愉悦印记
    event.remove({output: "naturesaura:token_joy"})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "count": 1,
                "nbt": "{stored_type:\"naturesaura:overworld\"}"
            },
            {
                "item": "naturesaura:gold_leaf"
            },
            {
                "item": 'minecraft:enchanted_golden_apple'
            },
            {
                "item": 'minecraft:soul_torch'
            },
            {
                "tag": 'forge:plates/iron'
            },
            {
                "item": 'minecraft:chorus_fruit'
            }
        ],
        "sapling": {
            "item": 'minecraft:acacia_sapling'
        },
        "output": {
            "item": "naturesaura:token_joy",
            "count": 2
        },
        "time": 200
    })

    // 恐惧印记
    event.remove({output: 'naturesaura:token_fear'})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "count": 1,
                "nbt": "{stored_type:\"naturesaura:nether\"}"
            },
            {
                "item": "naturesaura:gold_leaf"
            },
            {
                "item": "minecraft:rotten_flesh"
            },
            {
                "item": 'alexsmobs:roadrunner_feather'
            },
            {
                "item": 'minecraft:wither_skeleton_skull'
            },
            {
                "item": 'minecraft:soul_sand'
            }
        ],
        "sapling": {
            "item": 'minecraft:acacia_sapling'
        },
        "output": {
            "item": "naturesaura:token_fear",
            "count": 2
        },
        "time": 200
    })

    // 灌注黄铜
    event.recipes.create.mixing(['spongefactory:infused_brass', 'minecraft:iron_ingot'], [
        'naturesaura:infused_iron',
        '#forge:ingots/brass'
    ]).superheated()
    event.recipes.thermal.smelter(['spongefactory:infused_brass', 'minecraft:iron_ingot'], ['naturesaura:infused_iron', '#forge:ingots/brass'])

    // 祭祀台
    event.replaceInput({output: 'naturesaura:offering_table'}, 'naturesaura:infused_iron', 'spongefactory:infused_brass')
    event.replaceInput({output: 'naturesaura:offering_table'}, 'naturesaura:token_fear', "naturesaura:token_anger")

    // 愤怒印记
    event.remove({output: "naturesaura:token_anger"})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "count": 1,
                "nbt": "{stored_type:\"naturesaura:nether\"}"
            },
            {
                "item": "naturesaura:gold_leaf"
            },
            {
                "item": "minecraft:magma_block"
            },
            {
                "item": 'minecraft:echo_shard'
            },
            {
                "item": "minecraft:gunpowder"
            },
            {
                "item": "minecraft:ender_pearl"
            },
            {
                "item": "naturesaura:token_fear"
            },
            {
                "item": "naturesaura:token_joy"
            }
        ],
        "sapling": {
            "item": 'quark:ancient_sapling'
        },
        "output": {
            "item": "naturesaura:token_anger",
            "count": 1
        },
        "time": 200
    })

    // 忧伤印记
    event.remove({output: 'naturesaura:token_sorrow'})
    event.custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "count": 1,
                "nbt": "{stored_type:\"naturesaura:overworld\"}"
            },
            {
                "item": "naturesaura:gold_leaf"
            },
            {
                "item": "minecraft:ghast_tear"
            },
            [
                {
                    "item": "minecraft:beef"
                },
                {
                    "item": "minecraft:mutton"
                },
                {
                    "item": "minecraft:chicken"
                },
                {
                    "item": "minecraft:porkchop"
                }
            ],
            {
                "item": 'minecraft:tinted_glass'
            },
            {
                "tag": "minecraft:fishes"
            },
            {
                "item": "naturesaura:token_fear"
            },
            {
                "item": "naturesaura:token_joy"
            }
        ],
        "sapling": {
            "item": 'quark:ancient_sapling'
        },
        "output": {
            "item": "naturesaura:token_sorrow",
            "count": 1
        },
        "time": 200
    })

    // 苍穹锭
    event.remove({output: 'naturesaura:sky_ingot'})
    event.custom({
        "type": "naturesaura:offering",
        "input": {
            "item": 'spongefactory:infused_brass'
        },
        "start_item": {
            "item": "naturesaura:calling_spirit"
        },
        "output": {
            "item": "naturesaura:sky_ingot"
        }
    })

    // 呼唤之魂
    event.remove({output: 'naturesaura:calling_spirit'})
    event.custom({
        "type": "minecraft:crafting_shaped",
        "pattern": [
            " O ",
            "GDH",
            " N "
        ],
        "key": {
            "G": {
                "item": 'spongefactory:infused_brass'
            },
            "H": {
                "item": "naturesaura:tainted_gold"
            },
            "O": {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "nbt": {
                    "stored_type": "naturesaura:end"
                }
            },
            "N": {
                "type": "forge:nbt",
                "item": "naturesaura:aura_bottle",
                "nbt": {
                    "stored_type": "naturesaura:nether"
                }
            },
            "D": {
                "item": "minecraft:diamond"
            }
        },
        "result": {
            "item": "naturesaura:calling_spirit",
            "count": 2
        }
    })

    // 马桶
    event.remove({output: 'pfm:basic_toilet'})
    event.shaped('pfm:basic_toilet',
        [
            'B  ',
            'AAA',
            'CMA'], {
            B: 'quark:iron_button',
            A: 'minecraft:quartz_block',
            C: 'naturesaura:eye',
            M: 'create:precision_mechanism'
        }
    )

    // 肥料
    event.custom({
        "type": "naturesaura:offering",
        "input": {
            "item": 'pamhc2foodextended:epicbltitem'
        },
        "start_item": {
            "item": "pfm:basic_toilet"
        },
        "output": {
            "item": 'spongefactory:holy_shit',
            "count": 16
        }
    })

    // 黑巧克力
    event.remove({input: 'create_confectionery:cocoa_butter'})
    event.custom({
        "group": "create_confectionery",
        "type": "create:mixing",
        "ingredients": [
            {
                "item": "minecraft:sugar"
            },
            {
                "item": 'spongefactory:holy_shit'
            },
            {
                "fluidTag": "forge:milk",
                "amount": 250
            }
        ],
        "results": [
            {
                "fluid": "create_confectionery:black_chocolate",
                "amount": 250
            }
        ],
        "heatRequirement": "heated"
    })
    // 白巧克力
    event.custom({
        "group": "create_confectionery",
        "type": "create:mixing",
        "ingredients": [
            {
                "item": "minecraft:sugar"
            },
            {
                "item": "create_confectionery:cocoa_butter"
            },
            {
                "fluidTag": "forge:milk",
                "amount": 250
            }
        ],
        "results": [
            {
                "fluid": "create_confectionery:white_chocolate",
                "amount": 250
            }
        ],
        "heatRequirement": "heated"
    })

    // 巧克力到蛋糕
    event.custom({
        "type": "create:filling",
        "ingredients": [
            {
                "item": 'create:dough'
            },
            {
                "fluid": "create_confectionery:black_chocolate",
                "nbt": {},
                "amount": 1000
            }
        ],
        "results": [
            {
                "item": "minecraft:cake"
            }
        ]
    })

    // 粉碎末地石
    event.custom({
        "type": "create:haunting",
        "ingredients": [
            {
                "item": 'minecraft:end_stone'
            }
        ],
        "results": [
            {
                "item": 'occultism:crushed_end_stone'
            }
        ]
    })

    // Create种子油
    event.remove({id: 'createaddition:compacting/seed_oil'})

    // 焦炉内衬
    const hTRLining = 'spongefactory:high_temperature_resistant_lining'
    event.recipes.create.sequenced_assembly('spongefactory:coke_oven_lining', hTRLining, [
        event.recipes.createDeploying(hTRLining, [hTRLining, 'minecraft:clay_ball']),
        event.recipes.createFilling(hTRLining, [Fluid.water(1000), hTRLining]),
        event.recipes.createDeploying(hTRLining, [hTRLining, 'thermal_extra:amethyst_dust']),
        event.recipes.createDeploying(hTRLining, [hTRLining, 'spongefactory:otherworld_electrum_ingot']),
        event.recipes.createPressing(hTRLining, hTRLining)
    ]).transitionalItem(hTRLining).loops(10)

    // 紫水晶粉
    event.custom({
        "type": "create:crushing",
        "ingredients": [
            {
                "item": 'minecraft:amethyst_shard'
            }
        ],
        "processingTime": 300,
        "results": [
            {
                "chance": 0.1,
                "item": 'thermal_extra:amethyst_dust'
            }
        ]
    })

    // 粉碎轮琥珀金粉
    event.custom({
        "type": "create:crushing",
        "ingredients": [
            {
                "item": 'thermal:electrum_ingot'
            }
        ],
        "processingTime": 150,
        "results": [
            {
                "item": 'thermal:electrum_dust'
            }
        ]
    })

    // 焦炉砖
    event.replaceInput({output: 'immersiveengineering:cokebrick'}, '#forge:sandstone', 'spongefactory:coke_oven_lining')

    // 血液提取器
    event.remove({output: 'evilcraft:blood_extractor'})
    event.custom({
        "type": "minecraft:crafting_shaped",
        "pattern": [
            "SAS",
            " G ",
            " D "
        ],
        "key": {
            "S": {
                "item": "evilcraft:dark_spike"
            },
            "G": {
                "item": 'pneumaticcraft:small_tank'
            },
            "D": {
                "item": "evilcraft:dark_gem"
            },
            "A": {
                "item": 'thermal:servo_attachment'
            }
        },
        "result": {
            "item": "evilcraft:blood_extractor"
        }
    })
    // 连接件伺服器
    event.remove({output: 'thermal:servo_attachment'})
    event.shaped('2x thermal:servo_attachment',
        [
            ' X ',
            'BCB',
            'DND'], {
            X: 'pneumaticcraft:omnidirectional_hopper',
            C: 'thermal:fluid_duct',
            N: 'minecraft:redstone',
            D: 'minecraft:iron_ingot',
            B: '#forge:nuggets/tin'
        }
    )
    // (涡轮)
    event.replaceInput({output: 'thermal:turbo_servo_attachment'}, '#forge:glass', 'thermal:servo_attachment')
    // 移除硬化玻璃的shapeless配方
    event.remove({output: '#thermal:glass/hardened', type: 'minecraft:crafting_shapeless', mod: 'thermal'})
    // 流体管道
    event.replaceInput({output: 'thermal:fluid_duct'}, '#forge:ingots/lead', 'pneumaticcraft:liquid_hopper')
    // 流体管道（视窗）
    event.remove({output: 'thermal:fluid_duct_windowed'})
    event.shaped('4x thermal:fluid_duct_windowed',
        [
            '   ',
            'BCB',
            '   '], {
            C: 'thermal:fluid_duct',
            B: '#thermal:glass/hardened'
        }
    )
    // 小型储罐
    event.replaceInput({output: 'pneumaticcraft:small_tank'}, '#forge:glass', 'create:fluid_tank')

    // 红色地狱砖
    event.remove({id: 'quark:building/crafting/red_nether_bricks_util'})
    event.remove({id: 'minecraft:red_nether_bricks'})
    event.recipes.create.mixing('minecraft:red_nether_bricks', [
        'evilcraft:hardened_blood',
        'minecraft:cracked_nether_bricks',
        Fluid.of('evilcraft:blood', 250)
    ]).heated()
    // 高炉砖
    event.remove({id: 'immersiveengineering:crafting/blastbrick'})
    event.shaped('4x immersiveengineering:blastbrick',
        [
            'XAX',
            'ACA',
            'XAX'], {
            X: 'minecraft:red_nether_bricks',
            A: '#forge:ingots/brick',
            C: 'spongefactory:otherworld_electrum_ingot'
        }
    )

    // 压力管道
    event.remove({output: 'pneumaticcraft:pressure_tube'})
    const input = 'thermal:fluid_duct'
    event.recipes.create.sequenced_assembly('pneumaticcraft:pressure_tube', input, [
        event.recipes.createDeploying(input, [input, 'thermal:steel_plate']),
        event.recipes.createPressing(input, input),
        event.recipes.createPressing(input, input),
    ]).transitionalItem(input).loops(4)
    // 压力表
    event.replaceInput({output: 'pneumaticcraft:pressure_gauge'}, 'minecraft:gold_ingot', '#forge:ingots/electrum')

    // 压力室墙壁
    event.remove({output: 'pneumaticcraft:pressure_chamber_wall'})
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {
            "item": 'pneumaticcraft:reinforced_bricks'
        },
        "block_in": {
            "tag": "spongefactory:ethanol"
        },
        "post": [
            {
                "type": "drop_item",
                "item": "pneumaticcraft:pressure_chamber_wall"
            },
            {
                "type": "place",
                "block": "air"
            }
        ]
    })

    // 空气压缩机
    event.remove({output: 'pneumaticcraft:air_compressor'})
    event.shaped('pneumaticcraft:air_compressor',
        [
            'XXX',
            'XBC',
            'XAX'], {
            X: 'pneumaticcraft:pressure_chamber_wall',
            A: 'minecraft:furnace',
            C: 'pneumaticcraft:pressure_tube',
            B: 'create:encased_fan'
        }
    )

    // 绝缘覆层
    event.remove({output: 'powah:dielectric_paste'})
    event.shapeless('16x powah:dielectric_paste', ['immersiveengineering:coal_coke', 'immersiveengineering:coal_coke', 'minecraft:lava_bucket', 'minecraft:clay_ball'])

    // 惰性耐应力构件
    event.custom({
        "type": "create:mixing",
        "ingredients": [
            {
                "item": "spongefactory:stress_endurance_mechanism"
            },
            {
                "tag": "forge:ingots/compressed_iron"
            },
            {
                "fluidTag": "forge:plantoil",
                "amount": 250
            }
        ],
        "results": [
            {
                "item": 'spongefactory:inert_stress_endurance_mechanism',
                "count": 1
            }
        ],
        "heatRequirement": "superheated"
    })
    event.custom({
        "type": "thermal:bottler",
        "ingredients": [
            {
                "item": 'spongefactory:stress_endurance_mechanism'
            },
            {
                "fluid_tag": 'forge:plantoil',
                "amount": 250
            }
        ],
        "result": [
            {
                "item": 'spongefactory:inert_stress_endurance_mechanism'
            }
        ]
    })

    // 轮机转子
    event.replaceInput({output: 'pneumaticcraft:turbine_rotor'}, 'pneumaticcraft:ingot_iron_compressed', 'spongefactory:inert_stress_endurance_mechanism')

    // 气动工艺：速度升级
    event.remove({id: 'pneumaticcraft:speed_upgrade'})

    // 导热框架
    event.replaceInput({output: 'pneumaticcraft:heat_frame'}, 'pneumaticcraft:ingot_iron_compressed', 'pneumaticcraft:compressed_iron_block')

    // 涡流炮
    event.remove({output: 'pneumaticcraft:vortex_cannon'})
    event.custom({
        "type": "pneumaticcraft:crafting_shaped_pressurizable",
        "key": {
            "S": {
                "item": 'pneumaticcraft:air_canister'
            },
            "P": {
                "item": 'pneumaticcraft:ingot_iron_compressed'
            },
            "D": {
                "item": 'create:brass_ingot'
            },
            "A": {
                "item": 'pneumaticcraft:pressure_tube'
            }
        },
        "pattern": [
            "PDP",
            "PA ",
            "SPP"
        ],
        "result": {
            "item": "pneumaticcraft:vortex_cannon"
        }
    })

    // 涡流管
    event.remove({output: 'pneumaticcraft:vortex_tube'})
    event.shaped('pneumaticcraft:vortex_tube',
        [
            'XXX',
            'ADP',
            'XXX'], {

            X: 'pneumaticcraft:ingot_iron_compressed',
            A: 'pneumaticcraft:vortex_cannon',
            D: 'pneumaticcraft:pressure_tube',
            P: 'pneumaticcraft:drill_bit_compressed_iron'
        }
    )

    // 塑料格栅
    event.shaped('spongefactory:plastic_lattice',
        [
            'X X',
            ' X ',
            'X X'], {

            X: 'pneumaticcraft:plastic'
        }
    )
    // 蒸馏填料
    event.shaped('spongefactory:distillation_filler',
        [
            'XXX',
            'XXX',
            'XXX'
        ], {
            X: 'spongefactory:plastic_lattice'
        }
    )

    // 隔热板
    event.replaceInput({output: 'pneumaticcraft:thermal_lagging'}, '#minecraft:wool', '#thermal:rockwool')

    // 精炼厂
    // 控制器
    event.remove({output: 'pneumaticcraft:refinery'})
    event.shaped('pneumaticcraft:refinery',
        [
            'XVX',
            'ASA',
            'XXX'
        ], {
            X: 'pneumaticcraft:reinforced_stone_slab',
            S: 'pneumaticcraft:small_tank',
            V: 'spongefactory:distillation_filler',
            A: 'pneumaticcraft:thermal_lagging'
        }
    )
    // 输出端
    event.remove({output: 'pneumaticcraft:refinery_output'})
    event.shaped( 'pneumaticcraft:refinery_output',
        [
            'XVX',
            'ASA',
            'XVX'
        ], {
            X: 'pneumaticcraft:reinforced_stone_slab',
            S: 'pneumaticcraft:small_tank',
            V: 'spongefactory:distillation_filler',
            A:'pneumaticcraft:ingot_iron_compressed'
        }
    )
})

function replaceRecipes(event, match, wis) {
    event.replaceInput({}, match, wis)
    event.replaceOutput({}, match, wis)
}

function addGeneratedOreRecipes(event, oreName) {
    addOreWashingRecipes(event, oreName)
    addOreGroundRecipes(event, oreName)
    addCharcoalDustMixture(event, oreName)
    addSmeltingMixtureRecipes(event, oreName)
}

function addOreWashingRecipes(event, oreName) {
    // 丢入水中
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
        "block_in": {"blocks": ["minecraft:water"]},
        "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
    })
    // 丢入装水的炼药锅
    event.custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
        "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
        "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
    })
    // 水+鼓风机
    event.recipes.create.splashing("spongefactory:crushed_" + oreName + "_ore", "spongefactory:impure_crushed_" + oreName + "_ore")
}

function addOreGroundRecipes(event, oreName) {
    // 使用石锤
    event.shapeless("spongefactory:ground_" + oreName + "_ore", [Item.of("spongefactory:crushed_" + oreName + "_ore"), '#spongefactory:hammer'])
        .customIngredientAction('#spongefactory:hammer', "use_hammer")
    // 粉碎轮
    event.recipes.create.crushing("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 热力粉碎机
    event.recipes.thermal.pulverizer("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 通用机械粉碎机
    event.recipes.mekanismCrushing("spongefactory:ground_" + oreName + "_ore", "spongefactory:crushed_" + oreName + "_ore")
    // 沉浸粉碎机
    event.custom({
        "type": "immersiveengineering:crusher",
        "energy": 1600,
        "input": {"item": "spongefactory:crushed_" + oreName + "_ore"},
        "result": {"item": "spongefactory:ground_" + oreName + "_ore"},
        "secondaries": []
    })
}

function addCharcoalDustMixture(event, oreName) {
    event.shapeless("spongefactory:charcoal_" + oreName + "_ore_mixture", [Item.of('mekanism:dust_charcoal'), "spongefactory:ground_" + oreName + "_ore"])
}

function addSmeltingMixtureRecipes(event, oreName) {
    event.smelting("minecraft:raw_" + oreName, "spongefactory:charcoal_" + oreName + "_ore_mixture")
    event.recipes.thermal.smelter("minecraft:raw_" + oreName, "spongefactory:charcoal_" + oreName + "_ore_mixture")
}