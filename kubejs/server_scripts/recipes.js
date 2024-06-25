ServerEvents.recipes(event => {
    let removeOutput = (output) => {
        event.remove({output: output})
    }

    let custom = (json) => {
        return event.custom(json)
    }

    let plantCorundum = (color) => {
        event.recipes.botanypots.soil("quark:" + color + "_corundum",
            {
                block: "quark:" + color + "_corundum"
            },
            [
                color + "_corundum"
            ], -1, 1
        ).id('spongefactory:block_' + color + "_corundum")
        custom({
            "type": "botanypots:crop",
            "seed": {
                "item": "quark:" + color + "_corundum_cluster"
            },
            "categories": [
                color + "_corundum",
                'quartz_growth_accelerator'
            ],
            "growthTicks": 1200,
            "display": {
                "block": "quark:" + color + "_corundum_cluster",
                "properties": {
                    "facing": "up"
                }
            },
            "drops": [
                {
                    "chance": 1.00,
                    "output": {
                        "item": "quark:" + color + "_corundum_cluster"
                    },
                    "minRolls": 1,
                    "maxRolls": 1
                }
            ]
        }).id('spongefactory:' + color + '_corundum_cluster')
    }

    let addOreGroundRecipes = (oreName) => {
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
        custom({
            "type": "immersiveengineering:crusher",
            "energy": 1600,
            "input": {"item": "spongefactory:crushed_" + oreName + "_ore"},
            "result": {"item": "spongefactory:ground_" + oreName + "_ore"},
            "secondaries": []
        })
    }

    let addOreWashingRecipes = (oreName) => {
        // 丢入水中
        custom({
            "type": "lychee:item_inside",
            "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
            "block_in": {"blocks": ["minecraft:water"]},
            "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
        })
        // 丢入装水的炼药锅
        custom({
            "type": "lychee:item_inside",
            "item_in": {"item": "spongefactory:impure_crushed_" + oreName + "_ore"},
            "block_in": {"blocks": ["water_cauldron"], "state": {"level": 3}},
            "post": {"type": "drop_item", "item": "spongefactory:crushed_" + oreName + "_ore"}
        })
        // 水+鼓风机
        event.recipes.create.splashing("spongefactory:crushed_" + oreName + "_ore", "spongefactory:impure_crushed_" + oreName + "_ore")
    }

    let addCharcoalDustMixture = (oreName) => {
        event.shapeless("spongefactory:charcoal_" + oreName + "_ore_mixture", [Item.of('mekanism:dust_charcoal'), "spongefactory:ground_" + oreName + "_ore"])
    }

    let addSmeltingMixtureRecipes = (oreName) => {
        event.smelting("minecraft:raw_" + oreName, "spongefactory:charcoal_" + oreName + "_ore_mixture")
        event.recipes.thermal.smelter("minecraft:raw_" + oreName, "spongefactory:charcoal_" + oreName + "_ore_mixture")
    }

    let addGeneratedOreRecipes = (oreName) => {
        addOreWashingRecipes(oreName)
        addOreGroundRecipes(oreName)
        addCharcoalDustMixture(oreName)
        addSmeltingMixtureRecipes(oreName)
    }

    let bottleItem = (input, fluidTag, fluidAmount, output) => {
        custom({
            "type": "immersiveengineering:bottling_machine",
            "fluid": {
                "amount": fluidAmount,
                "tag": fluidTag
            },
            "input": {
                "item": input
            },
            "results": [
                {
                    "item": output
                }
            ]
        })
        custom({
            "type": "thermal:bottler",
            "ingredients": [
                {
                    "item": input
                },
                {
                    "fluid_tag": fluidTag,
                    "amount": fluidAmount
                }
            ],
            "result": [
                {
                    "item": output
                }
            ]
        })
    }

    let moltenIngot = (ingot, molten) => {
        custom({
            "type": "thermal:crucible",
            "ingredient": {
                "item": ingot
            },
            "result": [
                {
                    "fluid": molten,
                    "amount": 100
                }
            ],
            "energy": 8000
        })
        custom({
            "type": "thermal:chiller",
            "ingredients": [
                {
                    "fluid": molten,
                    "amount": 100
                },
                {
                    "item": 'thermal:chiller_ingot_cast'
                }
            ],
            "result": [
                {
                    "item": ingot,
                    "count": 1
                }
            ],
            "energy": 1000
        })
    }

    let pressMetalToPlate = (metal, plate) => {
        let id = "_" + metal + "_to_" + plate;
        id = id.replace(/:/g, '_');
        custom({
            "type": "create:pressing",
            "ingredients": [
                {
                    "item": metal
                }
            ],
            "results": [
                {
                    "item": plate
                }
            ]
        }).id("create_pressing" + id)
        custom({
            "group": "ad_astra",
            "type": "ad_astra:hammering",
            "ingredients": [
                {
                    "item": "ad_astra:hammer"
                },
                {
                    "item": metal
                }
            ],
            "result": {
                "item": plate,
                "count": 1
            }
        }).id("astra_hammer" + id)
        custom({
            "type": "thermal:press",
            "ingredient": {
                "item": metal
            },
            "result": [
                {
                    "item": plate
                }
            ]
        }).id("thermal_press" + id)
        custom({
            "type": "immersiveengineering:metal_press",
            "energy": 2400,
            "input": {
                "item": metal
            },
            "mold": "immersiveengineering:mold_plate",
            "result": {
                "item": plate
            }
        }).id("ie_press" + id)
        custom({
            "type": "minecraft:crafting_shapeless",
            "ingredients": [
                {
                    "item": metal
                },
                {
                    "item": "immersiveengineering:hammer"
                }
            ],
            "result": {
                "item": plate
            }
        }).id("ie_hammer" + id)
        custom({
            "type": "ad_astra:compressing",
            "input": {
                "item": metal
            },
            "output": {
                "id": plate,
                "count": 1
            },
            "cookTime": 200
        }).id("astra_pressing" + id)
    }

    event.remove({input: '#forge:ores', output: '#forge:ingots'})
    event.remove({input: '#forge:ores', output: '#forge:dusts'})
    event.remove({input: '#forge:ores', output: '#forge:raw_materials'})
    // Create的粉碎矿石
    event.remove({input: '#create:crushed_raw_materials'})
    removeOutput('#create:crushed_raw_materials')
    // 富集仓：矿->2粉
    // event.remove({input: '#forge:ores', type: 'mekanism:enriching'})
    // 沉浸电弧炉：矿->2锭
    // event.remove({input: '#forge:ores', type: 'immersiveengineering:arc_furnace'})
    // 沉浸粉碎机：矿->2粉
    // event.remove({input: '#forge:ores', type: 'immersiveengineering:crusher'})

    // 拆解台
    removeOutput('twilightforest:uncrafting_table')

    addGeneratedOreRecipes("copper")
    addGeneratedOreRecipes("iron")
    // 锌
    addOreWashingRecipes("zinc")
    addOreGroundRecipes("zinc")
    addCharcoalDustMixture("zinc")
    event.smelting("create:raw_" + "zinc", "spongefactory:charcoal_" + "zinc" + "_ore_mixture")
    // 金
    addOreWashingRecipes("gold")
    addOreGroundRecipes("gold")
    event.smelting("minecraft:raw_" + "gold", "spongefactory:ground_" + "gold" + "_ore")
    // 银
    addOreWashingRecipes("silver")
    addOreGroundRecipes("silver")
    addCharcoalDustMixture("silver")
    event.smelting("thermal:raw_" + "silver", "spongefactory:charcoal_" + "silver" + "_ore_mixture")
    // 锇
    addOreWashingRecipes("osmium")
    addOreGroundRecipes("osmium")
    // TODO: 后续加上用氢气还原锇
    // 锡
    addOreWashingRecipes("tin")
    addOreGroundRecipes("tin")
    addCharcoalDustMixture("tin")
    event.smelting("thermal:raw_" + "tin", "spongefactory:charcoal_" + "tin" + "_ore_mixture")
    // 镍
    addOreWashingRecipes("nickel")
    addOreGroundRecipes("nickel")
    // TODO: 后续加上用化学方法冶炼镍
    // 铝
    addOreWashingRecipes("aluminum")
    addOreGroundRecipes("aluminum")
    // 铅
    addOreWashingRecipes("lead")
    addOreGroundRecipes("lead")
    addCharcoalDustMixture("lead")
    event.smelting("thermal:raw_" + "lead", "spongefactory:charcoal_" + "lead" + "_ore_mixture")
    // 铀
    addOreWashingRecipes("uranium")
    addOreGroundRecipes("uranium")
    // TODO: 后续加上萃取炼铀
    // 钛
    addOreWashingRecipes("titanium")

    // 生石灰
    custom({
        "type": "lychee:item_burning",
        "item_in": {"tag": "forge:limestone"},
        "post": {"type": "drop_item", "item": "spongefactory:quicklime"}
    })

    // 熟石灰
    custom({
        "type": "lychee:item_inside",
        "item_in": {"item": "spongefactory:quicklime"},
        "block_in": {"blocks": ["minecraft:water"]},
        "post": [{"type": "drop_item", "item": "spongefactory:slaked_lime"}, {"type": "place", "block": "air"}]
    })
    custom({
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
    event.shapeless('mekanism:dust_charcoal', [Item.of('minecraft:charcoal'), 'spongefactory:stone_hammer'])
        .customIngredientAction('spongefactory:stone_hammer', "use_hammer")
    custom({
        "type": "minecraft:crafting_shapeless",
        "ingredients": [{"item": 'minecraft:charcoal'}, {"item": "immersiveengineering:hammer"}],
        "result": {"item": 'mekanism:dust_charcoal'}
    })
    // 用于扣除石锤的耐久
    Ingredient.registerCustomIngredientAction("use_hammer", (itemstack, index, inventory) => {
        let hammer_nbt = inventory.extractItem(inventory.find(Item.of('spongefactory:stone_hammer')), 1, false).getNbt();
        hammer_nbt.Damage += 1;
        // 此处 64 为石锤的durability属性
        if (hammer_nbt.Damage >= 64) {
            return Item.of('air');
        } else {
            itemstack.nbt = itemstack.nbt.merge(hammer_nbt);
        }
        return itemstack;
    })

    // 熔炉内衬
    custom({
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
    custom({
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
    removeOutput("quark:blackstone_furnace")
    removeOutput("quark:deepslate_furnace")
    removeOutput("minecraft:furnace")
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
    removeOutput('create:red_sand_paper')
    removeOutput('create:sand_paper')
    removeOutput('createaddition:diamond_grit_sandpaper')
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
    removeOutput('create:polished_rose_quartz')

    // 耐应力构件
    event.shaped(Item.of('spongefactory:stress_endurance_mechanism', 1), ['XXX', 'XAX', 'XXX'], {
        X: "#forge:nuggets/iron", A: '#spongefactory:polished_corundum'
    })
    // 抗应力构件
    custom({
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
    removeOutput('create:shaft')
    event.shaped(Item.of('create:shaft', 6), [' X ', ' A ', ' X '], {
        X: "#forge:nuggets/zinc", A: 'spongefactory:stress_endurance_mechanism'
    })
    // 齿轮
    removeOutput('create:cogwheel')
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
    removeOutput('create:basin')
    event.shaped(Item.of('create:basin', 1), ['A A', 'A A', 'AAA'], {
        A: 'create:andesite_alloy'
    })

    // 搅拌器
    removeOutput("create:whisk")
    event.shaped(Item.of('create:whisk', 1), [' O ', 'MXM', 'MMM'], {
        O: 'create:andesite_alloy', X: 'spongefactory:yielding_mechanism', M: 'thermal:iron_plate'
    })

    // 耐高温内衬
    event.recipes.create.mixing('spongefactory:high_temperature_resistant_lining', [Fluid.water(500), '4x spongefactory:slaked_lime', 'spongefactory:furnace_lining'])
    // 空的烈焰人燃烧室
    removeOutput("create:empty_blaze_burner")
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
    removeOutput('createaddition:rolling_mill')
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
    removeOutput('create:electron_tube')
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
    removeOutput('create:brass_hand')
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
    removeOutput('create:crushing_wheel')
    custom({
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
    removeOutput('create:blaze_cake_base')
    event.recipes.create.compacting('create:blaze_cake_base', ['#forge:eggs', 'create_confectionery:white_chocolate_glazed_marshmallow', 'create:cinder_flour', 'spongefactory:high_temperature_resistant_lining'])

    // 烈焰蛋糕
    removeOutput('create:blaze_cake')
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
    removeOutput('minecraft:hopper')
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
    removeOutput('pneumaticcraft:omnidirectional_hopper')
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
    removeOutput('create:andesite_funnel')
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
    removeOutput('ars_nouveau:imbuement_chamber')
    event.shaped(Item.of('ars_nouveau:imbuement_chamber', 1),
        [
            'PXP',
            'XSX',
            'PPP'], {
            X: 'spongefactory:gold_plated_brass_ingot',
            P: 'minecraft:smooth_stone',
            S: 'industrialforegoing:machine_frame_pity'
        }
    )

    // 魔源罐
    removeOutput('ars_nouveau:source_jar')
    event.shaped(Item.of('ars_nouveau:source_jar', 1),
        [
            'PXP',
            'GGG',
            'XPX'], {
            X: 'spongefactory:gold_plated_brass_ingot',
            P: 'minecraft:smooth_stone',
            G: '#forge:glass'
        }
    )

    // 火山魔源通道
    removeOutput('ars_nouveau:volcanic_sourcelink')
    event.shaped(Item.of('ars_nouveau:volcanic_sourcelink', 1),
        [
            ' G ',
            'XPX',
            'XBX'], {
            X: 'spongefactory:gold_plated_brass_ingot',
            P: 'create:blaze_cake',
            G: 'ars_nouveau:source_gem',
            B: 'ars_nouveau:source_gem_block'
        }
    )

    // 魔源中继器
    removeOutput('ars_nouveau:relay')
    event.shaped(Item.of('ars_nouveau:relay', 1),
        [
            'X X',
            'BGB',
            'X X'], {
            X: 'spongefactory:gold_plated_brass_ingot',
            G: 'ars_nouveau:source_gem_block',
            B: '#forge:ingots/gold'
        }
    )

    // 奥术基座
    event.replaceInput({output: 'ars_nouveau:arcane_pedestal'}, 'minecraft:gold_nugget', '#forge:nuggets/brass')

    // 附魔装置
    removeOutput('ars_nouveau:enchanting_apparatus')
    event.shaped('ars_nouveau:enchanting_apparatus',
        [
            'GAG',
            'XCX',
            'GAG'
        ], {
            X: 'spongefactory:gold_plated_brass_ingot',
            C: 'thermal:machine_frame',
            G: 'minecraft:gold_nugget',
            A: 'ars_nouveau:sourcestone'
        }
    )

    // 魔源宝石
    event.remove({output: 'ars_nouveau:source_gem', type: 'ars_nouveau:imbuement'})
    event.remove({output: 'ars_nouveau:source_gem_block', type: 'ars_nouveau:imbuement'})
    custom({
        "type": "ars_nouveau:imbuement",
        "count": 1,
        "input": {
            "tag": "spongefactory:polished_corundum"
        },
        "output": "ars_nouveau:source_gem",
        "pedestalItems": [],
        "source": 500
    })
    custom({
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
    removeOutput('ars_nouveau:lava_lily')

    // 笔与墨
    event.shapeless('spongefactory:scribing_tools', ['minecraft:black_dye', 'minecraft:glass_bottle', '#forge:feathers'])
    // 抄写台
    removeOutput('ars_nouveau:scribes_table')
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
    removeOutput('ars_nouveau:air_essence')
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
    removeOutput('ars_nouveau:earth_essence')
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
    removeOutput('ars_nouveau:water_essence')
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
    removeOutput('ars_nouveau:fire_essence')
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
    removeOutput('ars_nouveau:manipulation_essence')
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
    removeOutput('create:precision_mechanism')
    const skyIngot = 'naturesaura:sky_ingot'
    event.recipes.create.sequenced_assembly('create:precision_mechanism', skyIngot, [
        event.recipes.createDeploying(skyIngot, [skyIngot, 'create:brass_sheet']),
        event.recipes.createDeploying(skyIngot, [skyIngot, 'create:cogwheel']),
        event.recipes.createDeploying(skyIngot, [skyIngot, 'create:wrench']).keepHeldItem(),
        event.recipes.createDeploying(skyIngot, [skyIngot, 'create:large_cogwheel']),
        event.recipes.createDeploying(skyIngot, [skyIngot, 'create:wrench']).keepHeldItem(),
        event.recipes.createDeploying(skyIngot, [skyIngot, 'minecraft:iron_nugget']),
    ]).transitionalItem(skyIngot).loops(5)

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
    custom({
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
    removeOutput('occultism:butcher_knife')
    custom({
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
    removeOutput('naturesaura:nature_altar')
    custom({
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
    removeOutput("naturesaura:token_joy")
    custom({
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
    removeOutput('naturesaura:token_fear')
    custom({
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
    removeOutput("naturesaura:token_anger")
    custom({
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
    removeOutput('naturesaura:token_sorrow')
    custom({
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
    removeOutput('naturesaura:sky_ingot')
    custom({
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
    removeOutput('naturesaura:calling_spirit')
    custom({
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
    removeOutput('pfm:basic_toilet')
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
    custom({
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
    custom({
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
    custom({
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
    custom({
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
    custom({
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
    custom({
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
    custom({
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
    removeOutput('evilcraft:blood_extractor')
    custom({
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
    removeOutput('thermal:servo_attachment')
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
    removeOutput('thermal:fluid_duct_windowed')
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
    removeOutput('pneumaticcraft:pressure_tube')
    const duct = 'thermal:fluid_duct'
    event.recipes.create.sequenced_assembly('pneumaticcraft:pressure_tube', duct, [
        event.recipes.createDeploying(duct, [duct, 'thermal:steel_plate']),
        event.recipes.createPressing(duct, duct),
        event.recipes.createPressing(duct, duct),
    ]).transitionalItem(duct).loops(4)
    // 压力表
    event.replaceInput({output: 'pneumaticcraft:pressure_gauge'}, 'minecraft:gold_ingot', '#forge:ingots/electrum')

    // 压力室墙壁
    removeOutput('pneumaticcraft:pressure_chamber_wall')
    custom({
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
    removeOutput('pneumaticcraft:air_compressor')
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
    removeOutput('powah:dielectric_paste')
    event.shapeless('16x powah:dielectric_paste', ['immersiveengineering:coal_coke', 'immersiveengineering:coal_coke', 'minecraft:lava_bucket', 'minecraft:clay_ball'])

    // 惰性耐应力构件
    custom({
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
    custom({
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
    custom({
        "type": "immersiveengineering:bottling_machine",
        "fluid": {
            "amount": 250,
            "tag": 'forge:plantoil'
        },
        "input": {
            "item": 'spongefactory:stress_endurance_mechanism'
        },
        "results": [
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
    removeOutput('pneumaticcraft:vortex_cannon')
    custom({
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
    removeOutput('pneumaticcraft:vortex_tube')
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
    removeOutput('pneumaticcraft:refinery')
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
    removeOutput('pneumaticcraft:refinery_output')
    event.shaped('pneumaticcraft:refinery_output',
        [
            'XVX',
            'ASA',
            'XVX'
        ], {
            X: 'pneumaticcraft:reinforced_stone_slab',
            S: 'pneumaticcraft:small_tank',
            V: 'spongefactory:distillation_filler',
            A: 'pneumaticcraft:ingot_iron_compressed'
        }
    )

    // 给线圈用上线轴
    event.replaceInput({output: '#immersiveengineering:toolbox/wiring'}, '#forge:rods/wooden', 'createaddition:spool')

    // 树液提取器
    removeOutput('thermal:device_tree_extractor')
    event.shaped('thermal:device_tree_extractor',
        [
            'XVX',
            'ASA',
            'XXX'
        ], {
            X: '#minecraft:planks',
            S: 'pneumaticcraft:liquid_hopper',
            V: 'pneumaticcraft:small_tank',
            A: 'thermal:lead_plate'
        }
    )

    // 初级线圈
    const primarySpool = 'createaddition:spool'
    event.recipes.create.sequenced_assembly('spongefactory:primary_coil', primarySpool, [
        event.recipes.createDeploying(primarySpool, [primarySpool, '#forge:wires/copper']),
        event.recipes.createFilling(primarySpool, [Fluid.of('thermal:resin', 125), primarySpool]),
    ]).transitionalItem(primarySpool).loops(1)

    // 次级线圈
    const secondarySpool = 'createaddition:spool'
    event.recipes.create.sequenced_assembly('spongefactory:secondary_coil', secondarySpool, [
        event.recipes.createDeploying(secondarySpool, [secondarySpool, '#forge:wires/copper']),
        event.recipes.createDeploying(secondarySpool, [secondarySpool, '#forge:wires/copper']),
        event.recipes.createFilling(secondarySpool, [Fluid.of('thermal:resin', 250), secondarySpool]),
    ]).transitionalItem(secondarySpool).loops(1)

    // 放电线圈
    event.shapeless('2x spongefactory:ignition_coil', ['spongefactory:primary_coil', 'spongefactory:secondary_coil'])

    // 火花塞
    event.shaped('spongefactory:spark_plug',
        [
            ' A ',
            'DUD',
            ' X '
        ], {
            A: 'minecraft:iron_ingot',
            D: '#spongefactory:ferromagnetic_materials',
            U: 'spongefactory:ignition_coil',
            X: '#forge:rods/iron'
        }
    )

    // 气缸
    custom({
        "type": "create:mechanical_crafting",
        "acceptMirrored": true,
        "key": {
            "X": {
                "tag": 'forge:ingots/silver'
            },
            "P": {
                "item": 'minecraft:piston'
            },
            "O": {
                "item": 'pneumaticcraft:reinforced_pressure_tube'
            },
            "I": {
                "item": 'spongefactory:spark_plug'
            }
        },
        "pattern": [
            " P ",
            "XIX",
            "X O",
            "XXX"
        ],
        "result": {
            "count": 1,
            "item": 'spongefactory:engine_block'
        }
    })

    // 内燃机
    event.shaped('spongefactory:internal_combustion_engine',
        [
            ' X ',
            'XAX',
            ' X '
        ], {
            X: 'spongefactory:engine_block',
            A: '#forge:rods/iron'
        }
    )

    // 液体压缩机
    removeOutput('pneumaticcraft:liquid_compressor')
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "B": {
                "type": "forge:nbt",
                "count": 1,
                "item": "pneumaticcraft:small_tank"
            },
            "C": {
                "item": "pneumaticcraft:air_compressor"
            },
            "L": {
                "tag": "forge:leather"
            },
            "P": {
                "item": "pneumaticcraft:pressure_tube"
            },
            "O": {
                "item": 'spongefactory:internal_combustion_engine'
            }
        },
        "pattern": [
            " B ",
            "PCP",
            "LOL"
        ],
        "result": {
            "item": "pneumaticcraft:liquid_compressor"
        }
    })

    // 高级液体压缩机
    removeOutput('pneumaticcraft:advanced_liquid_compressor')
    custom({
        "type": "pneumaticcraft:compressor_upgrade_crafting",
        "key": {
            "C": {
                "item": "pneumaticcraft:liquid_compressor"
            },
            "I": {
                "tag": "forge:ingots/compressed_iron"
            },
            "T": {
                "item": 'pneumaticcraft:reinforced_pressure_tube'
            },
            "P": {
                "item": 'pneumaticcraft:security_upgrade'
            },
            "A": {
                "item": 'spongefactory:internal_combustion_engine'
            }
        },
        "pattern": [
            "IPI",
            "IAT",
            "ICI"
        ],
        "result": {
            "item": "pneumaticcraft:advanced_liquid_compressor"
        }
    })

    // 高级空气压缩机
    removeOutput('pneumaticcraft:advanced_air_compressor')
    custom({
        "type": "pneumaticcraft:compressor_upgrade_crafting",
        "key": {
            "C": {
                "item": "pneumaticcraft:air_compressor"
            },
            "I": {
                "tag": "forge:ingots/compressed_iron"
            },
            "T": {
                "item": "pneumaticcraft:advanced_pressure_tube"
            },
            "P": {
                "item": 'pneumaticcraft:security_upgrade'
            },
            "S": {
                "item": 'thermal:machine_furnace'
            }
        },
        "pattern": [
            "IPI",
            "IST",
            "ICI"
        ],
        "result": {
            "item": "pneumaticcraft:advanced_air_compressor"
        }
    })

    // 白色粉笔
    removeOutput('occultism:chalk_white')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "tag": 'forge:lpg'
        },
        "item_input": {
            "item": 'occultism:chalk_white_impure'
        },
        "item_output": {
            "item": 'occultism:chalk_white'
        },
        "pressure": 9.5,
        "speed": 0.1,
        "temperature": {
            "min_temp": 373
        }
    })

    // 硅
    event.remove({id: 'ae2:smelting/silicon_from_certus_quartz_dust'})
    event.remove({id: 'ae2:blasting/silicon_from_certus_quartz_dust'})
    event.shaped('8x ae2:silicon',
        [
            "XXX"
        ], {
            X: 'mysticalagriculture:silicon_essence'
        }
    )
    custom({
        "type": "occultism:spirit_fire",
        "ingredient": {
            "item": 'ae2:certus_quartz_dust'
        },
        "result": {
            "item": 'ae2:silicon'
        }
    })

    // 无暇的赛特斯石英母岩
    custom({
        "type": "naturesaura:tree_ritual",
        "ingredients": [
            {
                "item": 'ae2:quartz_block'
            },
            {
                "item": 'ae2:damaged_budding_quartz'
            },
            {
                "item": 'ae2:chipped_budding_quartz'
            },
            {
                "item": 'ae2:flawed_budding_quartz'
            },
            {
                "item": 'naturesaura:gold_leaf'
            },
            {
                "item": 'minecraft:anvil'
            }
        ],
        "sapling": {
            "item": 'occultism:otherworld_sapling'
        },
        "output": {
            "item": 'ae2:flawless_budding_quartz',
            "count": 1
        },
        "time": 200
    })

    // 真空泵
    removeOutput('pneumaticcraft:vacuum_pump')
    custom({
        "type": "occultism:ritual",
        "ritual_type": "occultism:craft",
        "activation_item": {
            "item": 'create:encased_fan'
        },
        "pentacle_id": "occultism:possess_foliot",
        "duration": 5,
        "spirit_max_age": -1,
        "ritual_dummy": {
            "item": 'minecraft:air'
        },
        "ingredients": [
            {
                "item": 'pneumaticcraft:reinforced_stone_slab'
            },
            {
                "item": 'pneumaticcraft:reinforced_stone_slab'
            },
            {
                "item": 'pneumaticcraft:reinforced_stone_slab'
            },
            {
                "item": 'pneumaticcraft:pressure_gauge'
            },
            {
                "item": 'pneumaticcraft:pressure_gauge'
            },
            {
                "item": 'pneumaticcraft:turbine_rotor'
            },
            {
                "item": 'pneumaticcraft:pressure_tube'
            },
            {
                "item": 'pneumaticcraft:pressure_tube'
            },
            {
                "item": 'pneumaticcraft:ingot_iron_compressed'
            },
            {
                "item": 'pneumaticcraft:ingot_iron_compressed'
            }
        ],
        "result": {
            "item": 'pneumaticcraft:vacuum_pump'
        }
    }).id('spongefactory:craft_vacuum_pump')

    // 真空管
    removeOutput('immersiveengineering:electron_tube')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 500,
            "fluid": 'thermal:resin'
        },
        "item_input": {
            "item": 'create:electron_tube'
        },
        "item_output": {
            "item": 'immersiveengineering:electron_tube'
        },
        "pressure": -0.6,
        "speed": 0.1
    })

    // 献祭之碗
    removeOutput('occultism:sacrificial_bowl')
    custom({
        "type": "create:haunting",
        "ingredients": [
            {
                "item": 'evilcraft:bowl_of_promises_empty'
            }
        ],
        "results": [
            {
                "item": 'occultism:sacrificial_bowl'
            }
        ]
    })

    // 黄金献祭之碗
    removeOutput('occultism:golden_sacrificial_bowl')
    custom({
        "type": "naturesaura:offering",
        "input": {
            "item": 'occultism:sacrificial_bowl'
        },
        "start_item": {
            "item": 'naturesaura:tainted_gold_block'
        },
        "output": {
            "item": 'occultism:golden_sacrificial_bowl',
            "count": 1
        }
    })

    // 电容
    event.remove({id: 'pneumaticcraft:pressure_chamber/capacitor'})
    custom({
        "type": "pneumaticcraft:pressure_chamber",
        "inputs": [
            {
                "type": "pneumaticcraft:stacked_item",
                "count": 2,
                "tag": 'forge:plates/copper'
            },
            {
                "item": 'immersiveengineering:electron_tube'
            },
            {
                "item": 'pneumaticcraft:plastic'
            },
            {
                "item": 'ae2:silicon'
            }
        ],
        "pressure": -0.8,
        "results": [
            {
                "item": "pneumaticcraft:capacitor"
            }
        ]
    })

    // 晶体管
    event.remove({id: 'pneumaticcraft:pressure_chamber/transistor'})
    custom({
        "type": "pneumaticcraft:pressure_chamber",
        "inputs": [
            {
                "item": 'immersiveengineering:electron_tube'
            },
            {
                "item": 'pneumaticcraft:plastic'
            },
            {
                "type": "pneumaticcraft:stacked_item",
                "count": 2,
                "item": 'ae2:silicon'
            },
            {
                "item": 'redstonepen:control_box'
            }
        ],
        "pressure": -0.6,
        "results": [
            {
                "item": 'pneumaticcraft:transistor'
            }
        ]
    })

    // 空印刷电路板
    event.remove({id: 'pneumaticcraft:pressure_chamber/empty_pcb'})
    const input = 'ae2:silicon'
    event.recipes.create.sequenced_assembly('pneumaticcraft:empty_pcb', input, [
        event.recipes.createPressing(input, input),
        event.recipes.createDeploying(input, [input, '#forge:plates/gold']),
        event.recipes.createFilling(input, [Fluid.of('thermal:resin', 250), input]),
    ]).transitionalItem(input).loops(1)


    // 亚玛龙平板
    removeOutput('pneumaticcraft:amadron_tablet')
    custom({
        "type": "create:mechanical_crafting",
        "acceptMirrored": true,
        "key": {
            "P": {
                "tag": 'pneumaticcraft:plastic_sheets'
            },
            "O": {
                "tag": 'forge:glass_panes/lime'
            },
            "X": {
                "item": 'pneumaticcraft:gps_tool'
            },
            "V": {
                "item": 'pneumaticcraft:air_canister'
            },
            "M": {
                "item": 'create_sa:drone_controller'
            },
            "S": {
                "item": 'pneumaticcraft:capacitor'
            },
            "J": {
                "item": 'pneumaticcraft:transistor'
            },
            "^": {
                "item": 'pneumaticcraft:empty_pcb'
            }
        },
        "pattern": [
            "PPPPP",
            "PJXSP",
            "PJOSP",
            "PJVMP",
            "P^^^P"
        ],
        "result": {
            "count": 1,
            "item": 'pneumaticcraft:amadron_tablet'
        }
    })

    // 蚀刻酸
    event.remove({id: 'pneumaticcraft:pressure_chamber/etching_acid'})
    event.recipes.create.mixing(Fluid.of('pneumaticcraft:etching_acid', 1000), [
        Fluid.water(1000),
        'mekanism:block_salt',
        '3x mekanism:fluorite_gem',
        'minecraft:iron_ingot',
        '4x thermal:niter'
    ])

    // 蚀刻器
    event.remove({id: 'pneumaticcraft:etching_tank'})
    event.shaped('pneumaticcraft:etching_tank',
        [
            ' A ',
            'XJX',
            'CCC'
        ], {
            C: 'pneumaticcraft:reinforced_brick_slab',
            X: 'pneumaticcraft:reinforced_brick_wall',
            J: 'pneumaticcraft:small_tank',
            A: 'pneumaticcraft:vacuum_pump'
        }
    )

    // 金色粉笔
    removeOutput('occultism:chalk_gold_impure')
    custom({
        "type": "pneumaticcraft:amadron",
        "input": {
            "type": "ITEM",
            "amount": 48,
            "id": "minecraft:emerald"
        },
        "level": 0,
        "output": {
            "type": "ITEM",
            "amount": 1,
            "id": 'occultism:chalk_gold_impure'
        },
        "static": true
    })
    removeOutput('occultism:chalk_gold')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "tag": 'forge:ethanol'
        },
        "item_input": {
            "item": 'occultism:chalk_gold_impure'
        },
        "item_output": {
            "item": 'occultism:chalk_gold'
        },
        "pressure": 9.5,
        "speed": 0.1,
        "temperature": {
            "min_temp": 373
        }
    })

    // finishedPCB
    removeOutput('pneumaticcraft:printed_circuit_board')
    custom({
        "type": "occultism:ritual",
        "ritual_type": "occultism:craft",
        "activation_item": {
            "item": 'pneumaticcraft:unassembled_pcb'
        },
        "pentacle_id": "occultism:possess_foliot",
        "spirit_max_age": -1,
        "duration": 1,
        "ritual_dummy": {
            "item": "minecraft:air"
        },
        "ingredients": [
            {
                "item": 'pneumaticcraft:transistor'
            },
            {
                "item": 'pneumaticcraft:transistor'
            },
            {
                "item": 'pneumaticcraft:transistor'
            },
            {
                "item": 'pneumaticcraft:transistor'
            },
            {
                "item": 'pneumaticcraft:capacitor'
            },
            {
                "item": 'pneumaticcraft:capacitor'
            },
            {
                "item": 'pneumaticcraft:capacitor'
            },
            {
                "item": 'pneumaticcraft:capacitor'
            }
        ],
        "result": {
            "item": 'pneumaticcraft:printed_circuit_board'
        }
    }).id('spongefactory:craft_printed_circuit_board')

    // 血能注入器
    event.replaceInput({output: 'evilcraft:blood_infuser'}, '#forge:cobblestone', 'occultism:otherstone')

    // 血能注入之星
    removeOutput('evilcraft:blood_infusion_core')
    custom({
        "type": "minecraft:crafting_shaped",
        "pattern": [
            "SRS",
            "RGR",
            "SRS"
        ],
        "key": {
            "S": {
                "item": "evilcraft:hardened_blood_shard"
            },
            "R": {
                "item": "evilcraft:dark_power_gem"
            },
            "G": {
                "item": 'minecraft:nether_star'
            }
        },
        "result": {
            "item": "evilcraft:blood_infusion_core"
        }
    })

    // 漆包线
    custom({
        "type": "pneumaticcraft:assembly_laser",
        "input": {
            "item": 'spongefactory:ignition_coil'
        },
        "program": "laser",
        "result": {
            "item": 'spongefactory:magnet_wire'
        }
    })

    // 转子
    event.shaped('spongefactory:rotor',
        [
            'XVX',
            'VJV',
            'XVX'
        ], {
            J: 'spongefactory:ferromagnetic_material',
            V: 'spongefactory:magnet_wire',
            X: 'create:andesite_alloy'
        }
    )

    // 定子
    event.shaped('spongefactory:stator',
        [
            'XXX',
            'XCX',
            'XXX'
        ], {
            X: 'spongefactory:magnet_wire',
            C: 'spongefactory:ferromagnetic_material'
        }
    )

    // 铁磁材料
    event.shapeless('2x spongefactory:ferromagnetic_material', ['minecraft:lodestone', '#spongefactory:magnetizable'])

    // 动能发电机
    removeOutput('immersiveengineering:dynamo')
    event.shaped('immersiveengineering:dynamo',
        [
            ' M ',
            'SDS',
            'AXA'
        ], {
            X: 'immersiveengineering:coil_lv',
            A: 'immersiveengineering:component_iron',
            M: 'spongefactory:stator',
            D: 'spongefactory:rotor',
            S: 'minecraft:redstone'
        }
    )

    // 仅保留水平花纹的防腐木板
    event.remove({id: 'immersiveengineering:crafting/treated_wood_horizontal_from_packaged'})
    removeOutput('immersiveengineering:treated_wood_packaged')
    removeOutput('immersiveengineering:treated_wood_vertical')
    event.replaceInput({}, '#forge:treated_wood', 'immersiveengineering:treated_wood_horizontal')

    // 移除其他发电机
    removeOutput('immersiveengineering:thermoelectric_generator')
    removeOutput('ad_astra:coal_generator')
    removeOutput('immersiveengineering:generator')
    removeOutput('immersivepetroleum:gas_generator')
    removeOutput('productivebees:honey_generator')
    removeOutput('pneumaticcraft:pneumatic_dynamo')
    removeOutput('mekanismgenerators:heat_generator')
    event.shaped('mekanismgenerators:heat_generator',
        [
            'MMM',
            'SDS',
            'AXA'
        ], {
            X: 'create:steam_engine',
            A: 'minecraft:copper_ingot',
            M: 'minecraft:iron_ingot',
            D: 'immersiveengineering:dynamo',
            S: 'spongefactory:dielectric_paste_sheet'
        }
    )

    // 交流发电机
    event.replaceInput({output: 'createaddition:alternator'}, '#forge:rods/iron', 'immersiveengineering:dynamo')

    // 压缩机
    removeOutput('ad_astra:compressor')
    event.shaped('ad_astra:compressor',
        [
            'XDX',
            'X X',
            'XSX'
        ], {
            X: '#forge:plates/iron',
            D: 'create:mechanical_press',
            S: 'create:depot'
        }
    )

    // 绝缘覆层片
    custom({
        "type": "ad_astra:compressing",
        "input": {
            "item": 'powah:dielectric_paste'
        },
        "output": {
            "id": 'spongefactory:dielectric_paste_sheet',
            "count": 1
        },
        "cookTime": 200
    })
    event.recipes.thermal.press('spongefactory:dielectric_paste_sheet', 'powah:dielectric_paste')

    // 能量管道
    removeOutput('pipez:energy_pipe')
    event.shaped('16x pipez:energy_pipe',
        [
            'XXX',
            'SSS',
            'XXX'
        ], {
            X: 'spongefactory:dielectric_paste_sheet',
            S: 'immersiveengineering:coil_lv'
        }
    )

    // 工程块
    removeOutput('immersiveengineering:rs_engineering')
    event.shaped('4x immersiveengineering:rs_engineering',
        [
            'AVA',
            'VDV',
            'AVA'
        ], {
            A: 'immersiveengineering:sheetmetal_iron',
            V: 'spongefactory:dielectric_paste_sheet',
            D: 'minecraft:redstone_block'
        }
    )
    removeOutput('immersiveengineering:light_engineering')
    event.shaped('4x immersiveengineering:light_engineering',
        [
            'AVA',
            'VDV',
            'AVA'
        ], {
            A: 'immersiveengineering:sheetmetal_iron',
            V: 'immersiveengineering:component_iron',
            D: 'immersiveengineering:rs_engineering'
        }
    )
    removeOutput('immersiveengineering:heavy_engineering')
    event.shaped('4x immersiveengineering:heavy_engineering',
        [
            'AVA',
            'VDV',
            'AVA'
        ], {
            A: 'immersiveengineering:sheetmetal_steel',
            V: 'immersiveengineering:component_steel',
            D: 'immersiveengineering:light_engineering'
        }
    )

    // 种刚玉
    event.recipes.botanypots.soil('ae2:quartz_growth_accelerator',
        {
            block: 'ae2:quartz_growth_accelerator',
            "properties": {
                "powered": true
            }
        },
        [
            'quartz_growth_accelerator'
        ], -1, 1.3
    ).id('spongefactory:quartz_growth_accelerator')
    plantCorundum('red')
    plantCorundum('violet')
    plantCorundum('white')
    plantCorundum('yellow')
    plantCorundum('black')
    plantCorundum('blue')
    plantCorundum('indigo')
    plantCorundum('green')
    plantCorundum('orange')

    // 为气动的炼油配方增加温度上限
    event.remove({id: 'pneumaticcraft:refinery/oil_4'})
    event.remove({id: 'pneumaticcraft:refinery/oil_3'})
    event.remove({id: 'pneumaticcraft:refinery/oil_2'})
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 10,
            "tag": "forge:crude_oil"
        },
        "results": [
            {
                "amount": 2,
                "fluid": "pneumaticcraft:diesel"
            },
            {
                "amount": 3,
                "fluid": "pneumaticcraft:kerosene"
            },
            {
                "amount": 3,
                "fluid": "pneumaticcraft:gasoline"
            },
            {
                "amount": 2,
                "fluid": "pneumaticcraft:lpg"
            }
        ],
        "temperature": {
            "min_temp": 373,
            "max_temp": 673
        }
    }).id('pneumaticcraft:refinery/oil_4')
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 10,
            "tag": "forge:crude_oil"
        },
        "results": [
            {
                "amount": 2,
                "fluid": "pneumaticcraft:diesel"
            },
            {
                "amount": 3,
                "fluid": "pneumaticcraft:kerosene"
            },
            {
                "amount": 2,
                "fluid": "pneumaticcraft:lpg"
            }
        ],
        "temperature": {
            "min_temp": 373,
            "max_temp": 673
        }
    }).id('pneumaticcraft:refinery/oil_3')
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 10,
            "tag": "forge:crude_oil"
        },
        "results": [
            {
                "amount": 4,
                "fluid": "pneumaticcraft:diesel"
            },
            {
                "amount": 2,
                "fluid": "pneumaticcraft:lpg"
            }
        ],
        "temperature": {
            "min_temp": 373,
            "max_temp": 673
        }
    }).id('pneumaticcraft:refinery/oil_2')

    // 沉浸原油 - 精馏塔
    event.remove({type: 'immersivepetroleum:distillation'})
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 10,
            "tag": "forge:naphtha_cracked"
        },
        "results": [
            {
                "amount": 6,
                "fluid": "immersivepetroleum:ethylene"
            },
            {
                "amount": 2,
                "fluid": "immersivepetroleum:propylene"
            },
            {
                "amount": 2,
                "fluid": "immersivepetroleum:benzene"
            }
        ],
        "temperature": {
            "min_temp": 873
        }
    })
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 12,
            "tag": "forge:lubricant_cracked"
        },
        "results": [
            {
                "amount": 6,
                "fluid": "immersivepetroleum:kerosene"
            },
            {
                "amount": 6,
                "fluid": "immersivepetroleum:diesel_sulfur"
            }
        ],
        "temperature": {
            "min_temp": 873
        }
    })
    custom({
        "type": "pneumaticcraft:refinery",
        "input": {
            "type": "pneumaticcraft:fluid",
            "amount": 10,
            "tag": "forge:kerosene"
        },
        "results": [
            {
                "amount": 2,
                "fluid": "immersivepetroleum:naphtha"
            },
            {
                "amount": 3,
                "fluid": "immersivepetroleum:gasoline_additives"
            },
            {
                "amount": 5,
                "fluid": "immersivepetroleum:diesel_sulfur"
            }
        ],
        "temperature": {
            "min_temp": 873
        }
    })

    // 精炼配方
    custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid": "immersivepetroleum:ethylene",
            "amount": 100
        },
        "result": [
            {
                "fluid": "pneumaticcraft:plastic",
                "amount": 1000
            },
            {
                "item": "immersivepetroleum:bitumen",
                "chance": 0.05
            }
        ],
        "energy": 1024
    })
    custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid": "immersivepetroleum:propylene",
            "amount": 100
        },
        "result": [
            {
                "fluid": "pneumaticcraft:plastic",
                "amount": 2000
            },
            {
                "item": "immersivepetroleum:bitumen",
                "chance": 0.1
            }
        ],
        "energy": 1024
    })
    custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid_tag": "forge:lubricant",
            "amount": 24
        },
        "result": [
            {
                "fluid": "immersivepetroleum:lubricant_cracked",
                "amount": 24
            },
            {
                "item": "immersivepetroleum:paraffin_wax",
                "chance": 0.024
            }
        ],
        "energy": 512
    })
    custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid_tag": "forge:diesel_sulfur",
            "amount": 10
        },
        "result": [
            {
                "fluid": "immersivepetroleum:diesel",
                "amount": 10
            },
            {
                "item": "immersiveengineering:dust_sulfur",
                "chance": 0.05
            }
        ],
        "energy": 512
    })
    custom({
        "type": "thermal:refinery",
        "ingredient": {
            "fluid_tag": "forge:naphtha",
            "amount": 20
        },
        "result": [
            {
                "fluid": "immersivepetroleum:naphtha_cracked",
                "amount": 20
            }
        ],
        "energy": 512
    })

    // 乙醇到乙醛
    event.remove({id: 'immersiveengineering:refinery/acetaldehyde'})

    // 组件蓝图
    event.replaceInput({id: 'immersiveengineering:crafting/blueprint_components'}, '#forge:ingots/aluminum', 'immersiveengineering:plate_duroplast')

    // Gloomy Cactus
    event.recipes.botanypots.soil('deeperdarker:gloomy_sculk',
        {
            block: 'deeperdarker:gloomy_sculk'
        },
        [
            'gloomy_sculk'
        ], -1, 1
    ).id('spongefactory:gloomy_sculk')
    custom({
        "type": "botanypots:crop",
        "seed": {
            "item": 'deeperdarker:gloomy_cactus'
        },
        "categories": [
            'gloomy_sculk'
        ],
        "growthTicks": 1200,
        "display": {
            "block": 'deeperdarker:gloomy_cactus'
        },
        "drops": [
            {
                "chance": 1.00,
                "output": {
                    "item": 'deeperdarker:gloomy_cactus'
                },
                "minRolls": 1,
                "maxRolls": 1
            }
        ]
    }).id('spongefactory:gloomy_cactus')

    // 高定向热解石墨
    removeOutput('immersiveengineering:dust_hop_graphite')
    custom({
        "type": "immersiveengineering:squeezer",
        "energy": 19200,
        "input": {"base_ingredient": {"tag": "forge:dusts/coal_coke"}, "count": 8},
        "result": {"item": 'spongefactory:high_temperature_deposition_substrate'}
    })
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 72,
            "tag": 'forge:benzene'
        },
        "item_input": {
            "item": 'spongefactory:high_temperature_deposition_substrate'
        },
        "item_output": {
            "item": 'immersiveengineering:dust_hop_graphite'
        },
        "pressure": 3,
        "speed": 0.1,
        "temperature": {
            "min_temp": 2273
        }
    })
    removeOutput('immersiveengineering:ingot_hop_graphite')
    custom({
        "type": "immersiveengineering:metal_press",
        "conditions": [{"type": "forge:not", "value": {"type": "forge:tag_empty", "tag": 'forge:ingots/hop_graphite'}}],
        "energy": 3800,
        "input": {"base_ingredient": {"tag": 'forge:dusts/hop_graphite'}, "count": 2},
        "mold": 'thermal:chiller_ingot_cast',
        "result": {"tag": 'forge:ingots/hop_graphite'}
    })

    // 紫色粉笔
    custom({
        "type": "immersiveengineering:arc_furnace",
        "additives": [{"item": 'architects_palette:oracle_jelly'}, {"tag": 'forge:dusts/obsidian'}],
        "energy": 12800,
        "input": {"item": 'occultism:chalk_white_impure'},
        "results": [{"base_ingredient": {"item": 'occultism:chalk_purple_impure'}, "count": 1}],
        "time": 30
    })
    removeOutput('occultism:chalk_purple_impure')
    removeOutput('occultism:chalk_purple')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "tag": 'forge:ethanol'
        },
        "item_input": {
            "item": 'occultism:chalk_purple_impure'
        },
        "item_output": {
            "item": 'occultism:chalk_purple'
        },
        "pressure": 9.5,
        "speed": 0.1,
        "temperature": {
            "min_temp": 373
        }
    })

    // 电子元件
    event.replaceInput({output: 'immersiveengineering:component_electronic'}, '#forge:treated_wood_slab', 'immersiveengineering:circuit_board')
    // 高级电子元件
    event.replaceInput({output: 'immersiveengineering:component_electronic_adv'}, 'immersiveengineering:plate_duroplast', 'immersiveengineering:circuit_board')

    // 微缩合成
    removeOutput('compactcrafting:projector_dish')
    event.shaped('compactcrafting:projector_dish',
        [
            'AD ',
            'ASD',
            'AD '
        ], {
            A: '#c:glass_panes',
            S: 'immersiveengineering:component_electronic_adv',
            D: 'compactmachines:wall'
        }
    )
    removeOutput('compactcrafting:base')
    event.shaped('compactcrafting:base',
        [
            ' M ',
            'ROR',
            'SSS'
        ], {
            M: 'immersiveengineering:component_electronic',
            R: 'immersiveengineering:component_electronic_adv',
            O: 'immersiveengineering:rs_engineering',
            S: 'compactmachines:wall'
        }
    )
    removeOutput('compactmachines:wall')
    event.shaped('4x compactmachines:wall',
        [
            'SSS',
            'SOS',
            'SSS'
        ], {
            O: '#forge:plates/lead',
            S: 'minecraft:polished_deepslate'
        }
    )

    // 烈焰之眼
    removeOutput('naturesaura:fortress_finder')
    custom({
        "type": "occultism:ritual",
        "ritual_type": "occultism:craft",
        "activation_item": {
            "item": 'rftoolsbase:infused_enderpearl'
        },
        "pentacle_id": "occultism:craft_djinni",
        "duration": 5,
        "ritual_dummy": {
            "item": "air"
        },
        "ingredients": [
            {
                "item": 'naturesaura:token_anger'
            },
            {
                "item": 'occultism:spirit_attuned_gem'
            },
            {
                "item": 'occultism:spirit_attuned_gem'
            },
            {
                "item": 'twilightforest:carminite'
            },
            {
                "item": 'minecraft:blaze_powder'
            },
            {
                "item": 'minecraft:blaze_powder'
            }
        ],
        "result": {
            "item": 'naturesaura:fortress_finder'
        }
    }).id('spongefactory:craft_fortress_finder')

    // 潜影之眼
    removeOutput('naturesaura:end_city_finder')
    custom({
        "type": "occultism:spirit_fire",
        "ingredient": {
            "item": 'naturesaura:fortress_finder'
        },
        "result": {
            "item": 'naturesaura:end_city_finder'
        }
    })

    // 空间链接之眼
    custom({
        "type": "occultism:ritual",
        "ritual_type": "occultism:craft",
        "activation_item": {
            "item": 'naturesaura:end_city_finder'
        },
        "pentacle_id": "occultism:craft_afrit",
        "duration": 5,
        "ritual_dummy": {
            "item": "air"
        },
        "ingredients": [
            {
                "item": 'twilightforest:carminite_block'
            },
            {
                "item": 'twilightforest:carminite_block'
            },
            {
                "item": 'naturesaura:clock_hand'
            },
            {
                "item": 'architects_palette:oracle_jelly'
            },
            {
                "item": 'architects_palette:oracle_jelly'
            },
            {
                "item": 'architects_palette:entwine_rod'
            }
        ],
        "result": {
            "item": 'spongefactory:space_link_eye'
        }
    }).id('spongefactory:craft_space_link_eye')

    // 维度矩阵
    removeOutput('occultism:dimensional_matrix')
    custom({
        type: 'compactcrafting:miniaturization',
        version: 1,
        recipeSize: 3,
        layers: [
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                ]
            }
        ],
        catalyst: {
            id: 'spongefactory:space_link_eye',
            Count: 1
        },
        components: {
            'S': {
                type: "compactcrafting:block",
                block: 'minecraft:smooth_quartz'
            }
        },
        outputs: [{
            id: 'occultism:dimensional_matrix',
            Count: 1
        }]
    })

    // 传送门框架
    custom({
        type: 'compactcrafting:miniaturization',
        version: 1,
        recipeSize: 3,
        layers: [
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                    ["S", "S", "S"],
                ]
            }
        ],
        catalyst: {
            id: 'spongefactory:space_link_eye',
            Count: 1
        },
        components: {
            'S': {
                type: "compactcrafting:block",
                block: 'minecraft:obsidian'
            }
        },
        outputs: [{
            id: 'spongefactory:portal_frame',
            Count: 1
        }]
    })

    // 挖矿世界传送门
    removeOutput('jamd:mine_portal_block')
    event.shapeless('jamd:mine_portal_block', [Item.of('minecraft:netherite_pickaxe', '{Damage:0}'), 'spongefactory:portal_frame'])
    // 虚空世界传送门
    removeOutput('javd:portal_block')
    event.shapeless('javd:portal_block', [Item.of('naturesaura:aura_bottle', '{stored_type:"naturesaura:end"}').weakNBT(), 'spongefactory:portal_frame'])

    // 杆注魔
    event.replaceInput({output: 'thermal:chiller_rod_cast'}, 'minecraft:blaze_rod', 'occultism:chalk_purple')
    event.shaped(Item.of('immersiveengineering:blueprint', '{blueprint:"electrode"}'),
        [
            ' P ',
            'AAA',
            'SSS'
        ], {
            A: 'minecraft:blue_dye',
            S: 'minecraft:paper',
            P: 'thermal:chiller_rod_cast'
        }
    )

    // 卡顿 移除
    removeOutput('botania:munchdew')
    event.remove({id: 'occultism:ritual/familiar_otherworld_bird'})

    // 飞行 移除
    removeOutput('cyclic:chorus_flight')
    removeOutput('apotheosis:potion_charm')

    // 热爆花 移除
    removeOutput('botania:entropinnyum')

    // 黑曜石粉
    event.recipes.thermal.pulverizer('mekanism:dust_obsidian', 'minecraft:obsidian')
    // 通用机械粉碎机
    event.recipes.mekanismCrushing('mekanism:dust_obsidian', 'minecraft:obsidian')
    // 沉浸粉碎机
    custom({
        "type": "immersiveengineering:crusher",
        "energy": 1600,
        "input": {"item": 'minecraft:obsidian'},
        "result": {"item": 'mekanism:dust_obsidian'},
        "secondaries": []
    })

    // 删除所有碎矿者的配方
    event.remove({type: 'occultism:crushing'})

    // 胶子
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:up_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:boson"
        }
    })
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:down_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:boson"
        }
    })
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:strange_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:gluon"
        }
    })
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:charm_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:gluon"
        }
    })
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:bottom_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:gluon"
        }
    })
    custom({
        "type": "spongefactory:mass_energy_converting",
        "input": {
            "amount": 10,
            "gas": "spongefactory:top_quark"
        },
        "output": {
            "amount": 10,
            "gas": "spongefactory:gluon"
        }
    })

    // 黑铁锭
    event.remove({id: 'extendedcrafting:black_iron_ingot'})
    custom({
        "type": "lychee:item_inside",
        "item_in": [
            {
                "item": "minecraft:iron_ingot"
            },
            {
                "item": "spongefactory:blackstone_ingot"
            }
        ],
        "block_in": {
            "blocks": [
                "immersivepetroleum:benzene_fluid_block"
            ]
        },
        "post": {
            "type": "drop_item",
            "item": "extendedcrafting:black_iron_ingot",
            "count": 2
        }
    })

    // 异界石基座
    removeOutput('occultism:otherstone_pedestal')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "S   S",
            "SSSSS",
            " XXX ",
            "  X  ",
            " SSS "
        ],
        "key": {
            "S": {
                "item": 'occultism:otherstone_slab'
            },
            "X": {
                "item": 'occultism:otherstone'
            }
        },
        "result": {
            "item": 'occultism:otherstone_pedestal'
        }
    })

    // 含铁的黑石
    event.shaped('spongefactory:blackstone_with_iron',
        [
            ' S ',
            'SXS',
            ' S '
        ], {
            X: 'minecraft:blackstone',
            S: 'minecraft:iron_nugget'
        }
    )

    // 黑石锭
    custom({
        "type": "minecraft:blasting",
        "ingredient": {
            "item": 'spongefactory:blackstone_with_iron'
        },
        "result": 'spongefactory:blackstone_ingot',
        "experience": 0.1,
        "cookingtime": 125
    })
    custom({
        "type": "minecraft:smelting",
        "ingredient": {
            "item": 'spongefactory:blackstone_with_iron'
        },
        "result": 'spongefactory:blackstone_ingot',
        "experience": 0.1,
        "cookingtime": 250
    })

    // 流明精华
    event.remove({id: 'extendedcrafting:luminessence'})
    bottleItem('mysticalagriculture:inferium_essence', 'spongefactory:glowstone', 500, 'extendedcrafting:luminessence')

    // 强化荧石
    custom({
        "type": "immersiveengineering:fermenter",
        "energy": 6400,
        "fluid": {
            "amount": 125,
            "fluid": 'thermal:glowstone'
        },
        "input": {
            "item": 'thermal:glowstone_mushroom_spores'
        }
    })

    // 基础合成催化剂
    removeOutput('extendedcrafting:basic_catalyst')
    custom({
        "type": "pneumaticcraft:pressure_chamber",
        "inputs": [
            {
                "type": "pneumaticcraft:stacked_item",
                "count": 4,
                "item": 'extendedcrafting:basic_component'
            },
            {
                "item": 'extendedcrafting:black_iron_slate'
            }
        ],
        "pressure": 3,
        "results": [
            {
                "item": 'extendedcrafting:basic_catalyst'
            }
        ]
    })

    // 忧郁提取物
    custom({
        "type": "immersiveengineering:squeezer",
        "energy": 6400,
        "fluid": {
            "amount": 50,
            "fluid": 'spongefactory:gloomy_extract'
        },
        "input": {
            "item": 'deeperdarker:gloomy_cactus'
        }
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'deeperdarker:gloomy_cactus'
            }
        ],
        "result": [
            {
                "fluid": 'spongefactory:gloomy_extract',
                "amount": 50
            }
        ],
        "energy": 6400
    })

    // 高级合成组件、催化剂
    removeOutput('extendedcrafting:advanced_component')
    bottleItem('extendedcrafting:basic_component', 'spongefactory:gloomy_extract', 500, 'extendedcrafting:advanced_component')
    removeOutput('extendedcrafting:advanced_catalyst')
    custom({
        "type": "pneumaticcraft:pressure_chamber",
        "inputs": [
            {
                "type": "pneumaticcraft:stacked_item",
                "count": 4,
                "item": 'extendedcrafting:advanced_component'
            },
            {
                "item": 'extendedcrafting:black_iron_slate'
            }
        ],
        "pressure": 3,
        "results": [
            {
                "item": 'extendedcrafting:advanced_catalyst'
            }
        ]
    })

    // 高级合成台
    removeOutput('extendedcrafting:advanced_table')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "ABA",
            "CDC",
            "AEA"
        ],
        "key": {
            "A": {
                "item": "extendedcrafting:advanced_component"
            },
            "B": {
                "item": "extendedcrafting:advanced_catalyst"
            },
            "C": {
                "item": "extendedcrafting:basic_table"
            },
            "D": {
                "item": "minecraft:gold_block"
            },
            "E": {
                "item": "extendedcrafting:black_iron_slate"
            }
        },
        "result": {
            "item": 'extendedcrafting:advanced_table'
        }
    })

    // 盐水
    custom({
        "type": "immersiveengineering:mixer",
        "energy": 3200,
        "fluid": {
            "amount": 1000,
            "tag": 'minecraft:water'
        },
        "inputs": [{
            "tag": 'mekanism:block_salt'
        }],
        "result": {
            "amount": 1000,
            "fluid": 'mekanism:brine'
        }
    })

    // 稀硫酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'minecraft:water'
        },
        "item_input": {
            "item": 'thermal:sulfur'
        },
        "fluid_output": {
            "amount": 250,
            "fluid": 'spongefactory:dilute_sulfuric_acid'
        },
        "pressure": 3,
        "speed": 5,
        "temperature": {
            "min_temp": 1073
        }
    })
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "fluid_output": {
            "amount": 500,
            "fluid": 'spongefactory:dilute_sulfuric_acid'
        },
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'spongefactory:sulfuric_acid'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'minecraft:water'
        },
        "pressure": 2.0,
        "time": 50
    })
    // 发烟硫酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'spongefactory:dilute_sulfuric_acid'
        },
        "item_input": {
            "item": 'thermal:sulfur'
        },
        "fluid_output": {
            "amount": 250,
            "fluid": 'spongefactory:oleum'
        },
        "pressure": 1,
        "speed": 5,
        "temperature": {
            "min_temp": 353,
            "max_temp": 393
        }
    })
    // 硫酸
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "fluid_output": {
            "amount": 500,
            "fluid": 'spongefactory:sulfuric_acid'
        },
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'spongefactory:oleum'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'minecraft:water'
        },
        "pressure": 2.0,
        "time": 50
    })

    // 盐酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 250,
            "fluid": 'spongefactory:sulfuric_acid'
        },
        "item_input": {
            "item": 'mekanism:block_salt'
        },
        "fluid_output": {
            "amount": 250,
            "fluid": 'spongefactory:hydrochloric_acid'
        },
        "pressure": 3,
        "speed": 5,
        "temperature": {
            "min_temp": 373
        }
    })

    // 硝酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 50,
            "fluid": 'spongefactory:sulfuric_acid'
        },
        "item_input": {
            "item": 'thermal:niter'
        },
        "fluid_output": {
            "amount": 50,
            "fluid": 'spongefactory:nitric_acid'
        },
        "pressure": 1,
        "speed": 5,
        "temperature": {
            "min_temp": 473
        }
    })

    // 王水
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "fluid_output": {
            "amount": 200,
            "fluid": 'spongefactory:aqua_regia'
        },
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 150,
            "fluid": 'spongefactory:hydrochloric_acid'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 50,
            "fluid": 'spongefactory:nitric_acid'
        },
        "pressure": 2.0,
        "time": 50
    })

    // 氯金酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": 'spongefactory:aqua_regia'
        },
        "item_input": {
            "item": 'minecraft:gold_ingot'
        },
        "fluid_output": {
            "amount": 100,
            "fluid": 'spongefactory:chloroauric_acid_solution'
        },
        "pressure": 0,
        "speed": 5
    })

    // 金电镀液
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "fluid_output": {
            "amount": 1000,
            "fluid": 'spongefactory:gold_plating_solution'
        },
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "fluid": 'spongefactory:chloroauric_acid_solution'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 25,
            "fluid": 'spongefactory:potassium_hydroxide_solution'
        },
        "pressure": 2.0,
        "time": 50
    })

    // 氯金酸
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 50,
            "fluid": 'mekanism:brine'
        },
        "item_input": {
            "item": 'spongefactory:slaked_lime'
        },
        "fluid_output": {
            "amount": 50,
            "fluid": 'spongefactory:potassium_hydroxide_solution'
        },
        "pressure": 0,
        "speed": 5,
        "temperature": {
            "min_temp": 673
        }
    })

    // 存储促动基座
    removeOutput('occultism:storage_controller_base')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "fluid": 'spongefactory:gold_plating_solution'
        },
        "item_input": {
            "item": 'occultism:otherstone_pedestal'
        },
        "item_output": {
            "item": 'occultism:storage_controller_base'
        },
        "pressure": -0.8,
        "speed": 0.1,
        "temperature": {
            "min_temp": 673
        }
    })

    // 存储稳定器基座
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "A   A",
            "AAAAA"
        ],
        "key": {
            "A": {
                "item": "occultism:otherstone_slab"
            }
        },
        "result": {
            "item": 'spongefactory:storage_stabilizer_base'
        }
    })

    // 工业先锋的干橡胶
    removeOutput('industrialforegoing:plastic')

    // 魔源钢板金属
    event.shaped('4x spongefactory:sheetmetal_source_steel',
        [
            ' X ',
            'X X',
            ' X '
        ], {
            X: 'spongefactory:source_steel_plate'
        }
    )

    // 魔源钢板
    pressMetalToPlate('spongefactory:source_steel_ingot', 'spongefactory:source_steel_plate')

    // 魔源钢锭
    custom({
        "type": "ars_nouveau:imbuement",
        "count": 1,
        "input": {
            "item": 'thermal:steel_ingot'
        },
        "output": 'spongefactory:source_steel_ingot',
        "pedestalItems": [],
        "source": 500
    })

    // 空白插件
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "  A  ",
            " BCB ",
            " BDB ",
            "  A  "
        ],
        "key": {
            "A": {
                "item": "pneumaticcraft:plastic"
            },
            "B": {
                "item": 'spongefactory:gold_plated_brass_ingot'
            },
            "C": {
                "item": "minecraft:redstone"
            },
            "D": {
                "item": "pneumaticcraft:printed_circuit_board"
            }
        },
        "result": {
            "item": 'spongefactory:blank_addon'
        }
    })

    // 低级机器框架
    removeOutput('industrialforegoing:machine_frame_pity')
    custom({
        type: 'compactcrafting:miniaturization',
        version: 1,
        recipeSize: 3,
        layers: [
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "F", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["F", "F", "F"],
                    ["F", "F", "F"],
                    ["F", "F", "F"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "F", "S"],
                    ["S", "S", "S"],
                ]
            }
        ],
        catalyst: {
            id: 'spongefactory:blank_addon',
            Count: 1
        },
        components: {
            'S': {
                type: "compactcrafting:block",
                block: 'minecraft:oak_planks'
            },
            'F': {
                type: "compactcrafting:block",
                block: 'minecraft:cobblestone'
            }
        },
        outputs: [{
            id: 'industrialforegoing:machine_frame_pity',
            Count: 1
        }]
    })

    // 硫酸锌
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 1.0,
        "exothermic": true,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": 'spongefactory:dilute_sulfuric_acid'
        },
        "item_input": {
            "item": 'create:zinc_ingot'
        },
        "fluid_output": {
            "amount": 100,
            "fluid": 'spongefactory:zinc_sulfate_solution'
        },
        "pressure": 0,
        "speed": 5
    })

    // 锌电镀液
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "fluid_output": {
            "amount": 1000,
            "fluid": 'spongefactory:zinc_plating_solution'
        },
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 1000,
            "fluid": 'spongefactory:zinc_sulfate_solution'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 25,
            "fluid": 'spongefactory:potassium_hydroxide_solution'
        },
        "pressure": 2.0,
        "time": 50
    })

    // 镀金黄铜
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": 'spongefactory:gold_plating_solution'
        },
        "item_input": {
            "item": 'create:brass_ingot'
        },
        "item_output": {
            "item": 'spongefactory:gold_plated_brass_ingot'
        },
        "pressure": -0.8,
        "speed": 0.1,
        "temperature": {
            "min_temp": 673
        }
    })

    // 农艺魔源通道
    event.replaceInput({output: 'ars_nouveau:agronomic_sourcelink'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 炼金魔源通道
    event.replaceInput({output: 'ars_nouveau:alchemical_sourcelink'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 生死魔源通道
    event.replaceInput({output: 'ars_nouveau:vitalic_sourcelink'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 菌丝魔源通道
    event.replaceInput({output: 'ars_nouveau:mycelial_sourcelink'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 魔源元件外壳
    event.replaceInput({output: 'arseng:source_cell_housing'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 流体魔源通道
    event.replaceInput({output: 'starbunclemania:fluid_sourcelink'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')
    // 奥术核心
    event.replaceInput({output: 'ars_nouveau:arcane_core'}, 'minecraft:gold_ingot', 'spongefactory:gold_plated_brass_ingot')

    // 树液提取器
    event.replaceInput({output: 'industrialforegoing:fluid_extractor'}, 'minecraft:piston', 'ars_nouveau:alchemical_sourcelink')

    // 循环所有配方
    event.remove({mod: 'cyclic'})

    // 耐热绝缘覆层片
    event.shaped('3x spongefactory:heat_resistant_dielectric_paste_sheet',
        [
            'SSS',
            'XXX',
            'SSS'
        ], {
            X: 'spongefactory:dielectric_paste_sheet',
            S: 'industrialforegoing:dryrubber'
        }
    )

    // 未处理的机器框架
    custom({
        type: 'compactcrafting:miniaturization',
        version: 1,
        recipeSize: 3,
        layers: [
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["S", "S", "S"],
                    ["S", "", "S"],
                    ["S", "S", "S"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["X", "", "X"],
                    ["", "", ""],
                    ["X", "", "X"],
                ]
            },
            {
                type: 'compactcrafting:mixed',
                pattern: [
                    ["X", "X", "X"],
                    ["X", "", "X"],
                    ["X", "X", "X"],
                ]
            }
        ],
        catalyst: {
            id: 'spongefactory:heat_resistant_dielectric_paste_sheet',
            Count: 1
        },
        components: {
            'S': {
                type: "compactcrafting:block",
                block: 'immersiveengineering:sheetmetal_iron'
            },
            'X': {
                type: "compactcrafting:block",
                block: 'spongefactory:sheetmetal_source_steel'
            }
        },
        outputs: [{
            id: 'spongefactory:unprocessed_machine_frame',
            Count: 1
        }]
    })

    // 机器框架
    removeOutput('thermal:machine_frame')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 500,
            "fluid": 'spongefactory:zinc_plating_solution'
        },
        "item_input": {
            "item": 'spongefactory:unprocessed_machine_frame'
        },
        "item_output": {
            "item": 'thermal:machine_frame'
        },
        "pressure": -0.8,
        "speed": 0.1,
        "temperature": {
            "min_temp": 673
        }
    })

    // 移除所有齿轮的有序合成配方
    event.remove({output: '#forge:gears', type: 'minecraft:crafting_shaped'})
    event.remove({output: '#forge:gears', type: 'immersiveengineering:metal_press'})

    // 钻石齿轮
    custom({
        "type": "immersiveengineering:metal_press",
        "conditions": [
            {
                "type": "forge:not",
                "value": {
                    "type": "forge:tag_empty",
                    "tag": 'forge:gears/diamond'
                }
            }
        ],
        "energy": 2400,
        "input": {
            "base_ingredient": {
                "item": 'minecraft:diamond'
            },
            "count": 4
        },
        "mold": "immersiveengineering:mold_gear",
        "result": {
            "item": 'thermal:diamond_gear'
        }
    })

    // 粉碎之魔符
    removeOutput("ars_nouveau:glyph_crush")
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 55,
        "inputItems": [
            {
                "item": {
                    "item": "ars_nouveau:earth_essence"
                }
            },
            {
                "item": {
                    "item": 'create:crushing_wheel'
                }
            },
            {
                "item": {
                    "item": 'mob_grinding_utils:saw'
                }
            }
        ],
        "output": "ars_nouveau:glyph_crush"
    })

    // 磨粉机
    removeOutput('thermal:machine_pulverizer')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_crush',
            'ars_nouveau:glyph_craft',
            'minecraft:piston',
            'thermal:basalz_powder'
        ],
        'thermal:machine_frame',
        'thermal:machine_pulverizer',
        3000,
    )

    // 魔源钢粉
    event.recipes.thermal.pulverizer('spongefactory:source_steel_dust', 'spongefactory:source_steel_ingot')
    event.recipes.mekanismCrushing('spongefactory:source_steel_dust', 'spongefactory:source_steel_ingot')
    // 魔源钢粉到魔源钢锭
    custom({
        "type": "minecraft:blasting",
        "ingredient": {
            "item": 'spongefactory:source_steel_dust'
        },
        "result": 'spongefactory:source_steel_ingot',
        "experience": 0.1,
        "cookingtime": 125
    })
    custom({
        "type": "minecraft:smelting",
        "ingredient": {
            "item": 'spongefactory:source_steel_dust'
        },
        "result": 'spongefactory:source_steel_ingot',
        "experience": 0.1,
        "cookingtime": 250
    })

    // 水槽
    event.replaceInput({output: 'cookingforblockheads:sink'}, 'minecraft:water_bucket', 'ars_nouveau:glyph_conjure_water')

    // 分裂之魔符
    removeOutput("ars_nouveau:glyph_split")
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 160,
        "inputItems": [
            {
                "item": {
                    "item": "ars_nouveau:relay_splitter"
                }
            },
            {
                "item": {
                    "item": 'thermal:saw_blade'
                }
            },
            {
                "item": {
                    "item": 'create:mechanical_saw'
                }
            }
        ],
        "output": "ars_nouveau:glyph_split"
    })

    // 交换之魔符
    removeOutput("ars_nouveau:glyph_exchange")
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 55,
        "inputItems": [
            {
                "item": {
                    "item": "ars_nouveau:manipulation_essence"
                }
            },
            {
                "item": {
                    "item": "minecraft:emerald_block"
                }
            },
            {
                "item": {
                    "item": 'spongefactory:solvation_fabric'
                }
            },
            {
                "item": {
                    "tag": "forge:ender_pearls"
                }
            }
        ],
        "output": "ars_nouveau:glyph_exchange"
    })

    // 溶剂化织物
    event.shaped('spongefactory:solvation_fabric',
        [
            ' S ',
            'SXS',
            ' S '
        ], {
            X: 'spongefactory:source_steel_dust',
            S: 'minecraft:string'
        }
    )

    // 化学溶解室
    removeOutput('industrialforegoing:dissolution_chamber')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'spongefactory:solvation_fabric',
            'spongefactory:solvation_fabric',
            'thermal:diamond_gear',
            'pneumaticcraft:plastic',
            'minecraft:bucket',
            'minecraft:bucket',
            'ars_nouveau:glyph_exchange'
        ],
        'industrialforegoing:machine_frame_pity',
        'industrialforegoing:dissolution_chamber',
        3000,
    )

    // 氢氧化钾粉
    custom({
        "type": "thermal:crystallizer",
        "ingredients": [
            {
                "fluid": 'spongefactory:potassium_hydroxide_solution',
                "amount": 100
            },
            {
                "item": 'thermal:quartz_dust'
            }
        ],
        "result": [
            {
                "item": 'spongefactory:potassium_hydroxide_dust'
            }
        ]
    })

    // 钻石齿轮
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "tag": 'forge:gems/diamond',
                "count": 4
            },
            {
                "item": "thermal:press_gear_die"
            }
        ],
        "result": [
            {
                "item": 'thermal:diamond_gear'
            }
        ]
    })
    // 石英齿轮
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "tag": 'forge:gems/quartz',
                "count": 4
            },
            {
                "item": "thermal:press_gear_die"
            }
        ],
        "result": [
            {
                "item": 'thermal:quartz_gear'
            }
        ]
    })
    // 绿宝石齿轮
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "tag": 'forge:gems/emerald',
                "count": 4
            },
            {
                "item": "thermal:press_gear_die"
            }
        ],
        "result": [
            {
                "item": 'thermal:emerald_gear'
            }
        ]
    })
    // 青金石齿轮
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "tag": 'forge:gems/lapis',
                "count": 4
            },
            {
                "item": "thermal:press_gear_die"
            }
        ],
        "result": [
            {
                "item": 'thermal:lapis_gear'
            }
        ]
    })
    // 魔源钢齿轮
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'spongefactory:source_steel_ingot',
                "count": 4
            },
            {
                "item": "thermal:press_gear_die"
            }
        ],
        "result": [
            {
                "item": 'spongefactory:source_steel_gear'
            }
        ]
    })

    // 解包磨具
    removeOutput('thermal:press_unpacking_die')
    event.shaped('thermal:press_unpacking_die',
        [
            'X S',
            ' V ',
            'S X'
        ], {
            V: 'ars_nouveau:glyph_split',
            X: 'spongefactory:source_steel_plate',
            S: 'thermal:bronze_plate'
        }
    )

    // 破坏之魔符
    removeOutput('ars_nouveau:glyph_break')
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 55,
        "inputItems": [
            {
                "item": {
                    "item": 'forbidden_arcanus:netherite_blacksmith_gavel'
                }
            }
        ],
        "output": 'ars_nouveau:glyph_break'
    })

    // 移除塑料块、塑料路
    event.remove({output: '#pneumaticcraft:plastic_bricks'})
    event.remove({input: '#pneumaticcraft:plastic_bricks'})
    event.remove({output: '#pneumaticcraft:smooth_plastic_bricks'})
    event.remove({input: '#pneumaticcraft:smooth_plastic_bricks'})

    // 多驱冲压机
    removeOutput('thermal:machine_press')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'create:mechanical_press',
            'ars_nouveau:glyph_break',
            'minecraft:iron_block',
            'minecraft:anvil'
        ],
        'thermal:machine_frame',
        'thermal:machine_press',
        3000,
    )

    // 钙
    custom({
        "type": "immersiveengineering:arc_furnace",
        "additives": [
            {
                "item": 'mekanism:dust_charcoal'
            }
        ],
        "energy": 51200,
        "input": {
            "item": 'spongefactory:quicklime'
        },
        "results": [
            {
                "base_ingredient": {
                    "item": 'spongefactory:calcium_ingot'
                },
                "count": 1
            }
        ],
        "time": 100
    })

    // 盛装流体之魔符
    removeOutput('starbunclemania:glyph_pickup_fluid')
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 55,
        "inputItems": [
            {
                "item": {
                    "item": 'spongefactory:quicklime'
                }
            },
            {
                "item": {
                    "item": 'mekanism:salt'
                }
            },
            {
                "item": {
                    "item": 'minecraft:hopper'
                }
            },
            {
                "item": {
                    "item": 'starbunclemania:fluid_jar'
                }
            }
        ],
        "output": 'starbunclemania:glyph_pickup_fluid'
    })

    // 结晶器
    removeOutput('thermal:machine_crystallizer')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'starbunclemania:glyph_pickup_fluid',
            'thermal:diving_fabric',
            '#spongefactory:polished_corundum',
            'minecraft:cauldron'
        ],
        'thermal:machine_frame',
        'thermal:machine_crystallizer',
        3000,
    )

    // 移除裂岩弹制粉
    event.remove({input: 'thermal:earth_charge', output: '#forge:dusts'})
    event.remove({input: 'thermal:earth_charge', output: '#forge:dusts/ender_pearl'})

    // 硝酸钠
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'mekanism:salt'
            }
        ],
        "inputFluid": "{Amount:100,FluidName:\"spongefactory:nitric_acid\"}",
        "output": {
            "count": 1,
            "item": 'spongefactory:sodium_nitrate'
        },
        "processingTime": 100
    })

    // 亚硝酸钠
    custom({
        "type": "minecraft:smelting",
        "ingredient": {
            "item": 'spongefactory:sodium_nitrate'
        },
        "result": 'spongefactory:sodium_nitrite',
        "experience": 0.1,
        "cookingtime": 250
    })

    // 冻结之魔符
    removeOutput("ars_nouveau:glyph_freeze")
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 27,
        "inputItems": [
            {
                "item": {
                    "item": "ars_nouveau:water_essence"
                }
            },
            {
                "item": {
                    "item": "minecraft:snow_block"
                }
            },
            {
                "item": {
                    "item": 'powah:dry_ice'
                }
            },
            {
                "item": {
                    "item": 'spongefactory:sodium_nitrite'
                }
            },
            {
                "item": {
                    "item": 'thermal:ice_charge'
                }
            }
        ],
        "output": "ars_nouveau:glyph_freeze"
    })

    // 冷冻单元
    event.replaceInput({output: 'cookingforblockheads:ice_unit'}, 'minecraft:snowball', 'thermal:ice_charge')

    // 急速冷冻机
    removeOutput('thermal:machine_chiller')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'cookingforblockheads:ice_unit',
            'ars_nouveau:glyph_freeze',
            'cookingforblockheads:ice_unit',
            'powah:dry_ice'
        ],
        'thermal:machine_frame',
        'thermal:machine_chiller',
        3000,
    )

    // 熔融钾
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:potassium_hydroxide_dust'
            }
        ],
        "inputFluid": "{Amount:100,FluidName:\"spongefactory:molten_calcium\"}",
        "output": {
            "count": 1,
            "item": 'spongefactory:slaked_lime'
        },
        "outputFluid": "{Amount:100,FluidName:\"spongefactory:molten_potassium\"}",
        "processingTime": 100
    })

    // 熔融钠
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'mekanism:salt'
            }
        ],
        "inputFluid": "{Amount:100,FluidName:\"spongefactory:molten_potassium\"}",
        "output": {
            "count": 1,
            "item": 'spongefactory:hydrochloride'
        },
        "outputFluid": "{Amount:100,FluidName:\"spongefactory:molten_sodium\"}",
        "processingTime": 100
    })

    // 熔岩炉
    removeOutput('thermal:machine_crucible')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_smelt',
            'create:blaze_cake',
            'create:blaze_burner',
            'create:basin'
        ],
        'thermal:machine_frame',
        'thermal:machine_crucible',
        3000,
    )

    // 熔融钙
    moltenIngot('spongefactory:calcium_ingot', "spongefactory:molten_calcium")

    // 熔融钠
    moltenIngot('spongefactory:sodium_ingot', "spongefactory:molten_sodium")

    // 流体管道、物品管道
    event.replaceInput({output: 'pipez:item_pipe'}, 'minecraft:iron_ingot', 'immersiveengineering:plate_duroplast')
    event.replaceInput({output: 'pipez:fluid_pipe'}, 'minecraft:iron_ingot', 'immersiveengineering:plate_duroplast')

    // 四氯化钛
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:crushed_titanium_ore'
            },
            {
                "item": 'mekanism:dust_charcoal'
            },
            {
                "item": 'spongefactory:hypochlorite'
            }
        ],
        "inputFluid": "{Amount:100,FluidName:\"spongefactory:hydrochloric_acid\"}",
        "output": {
            "count": 1,
            "item": 'spongefactory:hydrochloride'
        },
        "outputFluid": "{Amount:100,FluidName:\"spongefactory:titanium_tetrachloride\"}",
        "processingTime": 100
    })

    // 次氯酸盐
    custom({
        "type": "pneumaticcraft:amadron",
        "input": {
            "type": "ITEM",
            "amount": 1,
            "id": "minecraft:emerald"
        },
        "level": 0,
        "output": {
            "type": "ITEM",
            "amount": 8,
            "id": 'spongefactory:hypochlorite'
        },
        "static": true
    })

    // 钛
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": "spongefactory:titanium_tetrachloride"
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 400,
            "fluid": "spongefactory:molten_sodium"
        },
        "item_output": {
            "item": 'spongefactory:titanium_ingot'
        },
        "pressure": 1,
        "time": 40
    })

    // 钛种子
    event.remove({id: 'mysticalagriculture:seed/infusion/titanium'})
    custom({
        "type": "mysticalagriculture:infusion",
        "ingredients": [
            {
                "item": 'spongefactory:titanium_ingot'
            },
            {
                "type": "mysticalagriculture:crop_component",
                "component": "essence",
                "crop": "mysticalagriculture:titanium"
            },
            {
                "item": 'spongefactory:titanium_ingot'
            },
            {
                "type": "mysticalagriculture:crop_component",
                "component": "essence",
                "crop": "mysticalagriculture:titanium"
            },
            {
                "item": 'spongefactory:titanium_ingot'
            },
            {
                "type": "mysticalagriculture:crop_component",
                "component": "essence",
                "crop": "mysticalagriculture:titanium"
            },
            {
                "item": 'spongefactory:titanium_ingot'
            },
            {
                "type": "mysticalagriculture:crop_component",
                "component": "essence",
                "crop": "mysticalagriculture:titanium"
            }
        ],
        "input": {
            "type": "mysticalagriculture:crop_component",
            "component": "seed",
            "crop": "mysticalagriculture:titanium"
        },
        "result": {
            "item": "mysticalagriculture:titanium_seeds"
        }
    })

    // 熔融钛
    moltenIngot('spongefactory:titanium_ingot', "spongefactory:molten_titanium")

    // 熔融钾
    moltenIngot('spongefactory:potassium_ingot', "spongefactory:molten_potassium")

    // 磁感应线圈
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "   AA",
            " ABBA",
            " BAB ",
            "ABBA ",
            "AA   "
        ],
        "key": {
            "A": {
                "item": "minecraft:gold_ingot"
            },
            "B": {
                "item": "spongefactory:titanium_ingot"
            }
        },
        "result": {
            "item": 'spongefactory:induction_coil'
        }
    })

    moltenIngot('thermal:lumium_ingot', 'spongefactory:molten_lumium')
    moltenIngot('thermal:signalum_ingot', 'spongefactory:molten_signalum')

    // 高级机器框架
    event.shaped('spongefactory:advanced_machine_frame',
        [
            'XSX'
        ], {
            S: 'thermal:machine_frame',
            X: 'spongefactory:induction_coil'
        }
    )

    // flammable
    removeOutput('ars_elemental:glyph_not_fiery_filter')
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 27,
        "inputItems": [
            {
                "item": {
                    "item": 'create:attribute_filter'
                }
            },
            {
                "item": {
                    "item": 'create:blaze_cake'
                }
            }
        ],
        "output": 'ars_elemental:glyph_not_fiery_filter'
    })

    // 红石熔炼炉
    removeOutput('thermal:machine_furnace')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_smelt',
            'ironfurnaces:silver_furnace',
            'thermal:fire_tnt',
            'ars_elemental:glyph_not_fiery_filter'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_furnace',
        3000,
    )

    // 法术之花种子
    event.remove({id: 'ars_nouveau:magebloom_crop'})
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'spongefactory:source_steel_ingot'
                    },
                    {
                        "item": 'spongefactory:source_steel_dust'
                    }
                ],
                "count": 4
            },
            {
                "value": [
                    {
                        "item": 'ars_nouveau:source_gem'
                    }
                ],
                "count": 4
            },
            {
                "value": [
                    {
                        "tag": 'forge:seeds'
                    }
                ],
                "count": 1
            }
        ],
        "result": [
            {
                "item": 'ars_nouveau:magebloom_crop',
                "count": 1
            }
        ],
        "energy": 2800
    })

    // 感应炉
    removeOutput('thermal:machine_smelter')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'spongefactory:induction_coil',
            'spongefactory:induction_coil',
            'spongefactory:induction_coil',
            'ars_nouveau:volcanic_sourcelink'
        ],
        'thermal:machine_furnace',
        'thermal:machine_smelter',
        3000,
    )

    // 时间存储控制器
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'naturesaura:clock_hand',
            'minecraft:clock'
        ],
        'occultism:storage_controller_base',
        'spongefactory:time_storage_controller',
        3000,
    )

    // 时间之瓶
    removeOutput('tiab:time_in_a_bottle')
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'naturesaura:bottle_two_the_rebottling'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'spongefactory:time_storage_controller'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'minecraft:clock'
                    }
                ],
                "count": 1
            }
        ],
        "result": [
            {
                "item": 'tiab:time_in_a_bottle',
                "count": 1
            }
        ],
        "energy": 30000
    })

    // 维度存储稳定器
    removeOutput('occultism:storage_stabilizer_tier1')
    removeOutput('occultism:storage_stabilizer_tier2')
    removeOutput('occultism:storage_stabilizer_tier3')
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 2500,
            "fluid": 'spongefactory:gold_plating_solution'
        },
        "item_input": {
            "item": 'spongefactory:storage_stabilizer_base'
        },
        "item_output": {
            "item": 'occultism:storage_stabilizer_tier3'
        },
        "pressure": -0.8,
        "speed": 0.1,
        "temperature": {
            "min_temp": 673
        }
    })

    // 热解炉
    removeOutput('thermal:machine_pyrolyzer')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:burst',
            'spongefactory:induction_coil',
            'minecraft:blaze_rod',
            'industrialforegoing:dissolution_chamber'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_pyrolyzer',
        3000,
    )

    // 紫颂脂
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 50,
            "fluid": 'spongefactory:chorus_juice'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 150,
            "fluid": 'spongefactory:chorus_oil'
        },
        "item_output": {
            "item": 'spongefactory:chorus_butter'
        },
        "pressure": 1,
        "time": 20
    })

    // 紫颂油
    custom({
        "type": "thermal:pyrolyzer",
        "ingredient": {
            "item": 'minecraft:popped_chorus_fruit'
        },
        "result": [{
            "fluid": 'spongefactory:chorus_oil',
            "amount": 100
        }
        ],
        "experience": 0.1
    })
    custom({
        "type": "thermal:pyrolyzer",
        "ingredient": {
            "item": 'minecraft:chorus_plant'
        },
        "result": [{
            "fluid": 'spongefactory:chorus_oil',
            "amount": 50
        }
        ],
        "experience": 0.1
    })

    // 紫颂汁
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:chorus_fruit'
            }
        ],
        "result": [
            {
                "fluid": 'spongefactory:chorus_juice',
                "amount": 100
            }
        ],
        "energy": 2400
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:chorus_flower'
            }
        ],
        "result": [
            {
                "fluid": 'spongefactory:chorus_juice',
                "amount": 150
            }
        ],
        "energy": 2400
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:chorus_plant'
            }
        ],
        "result": [
            {
                "fluid": 'spongefactory:chorus_juice',
                "amount": 50
            }
        ],
        "energy": 2400
    })

    // 紫颂锭
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'spongefactory:titanium_ingot'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'spongefactory:chorus_butter'
                    }
                ],
                "count": 3
            }
        ],
        "result": [
            {
                "item": 'spongefactory:chorus_ingot',
                "count": 1
            }
        ],
        "energy": 2400
    })

    // 发射之魔符
    removeOutput('ars_nouveau:glyph_launch')
    custom({
        "type": "ars_nouveau:glyph",
        "count": 1,
        "exp": 27,
        "inputItems": [
            {
                "item": {
                    "item": "ars_nouveau:air_essence"
                }
            },
            {
                "item": {
                    "item": 'spongefactory:chorus_ingot'
                }
            },
            {
                "item": {
                    "item": 'spongefactory:chorus_ingot'
                }
            },
            {
                "item": {
                    "item": 'minecraft:dispenser'
                }
            }
        ],
        "output": "ars_nouveau:glyph_launch"
    })

    // 流体灌装机
    removeOutput('thermal:machine_bottler')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_launch',
            'create:spout',
            'minecraft:bucket',
            'evilcraft:blood_infuser'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_bottler',
        3000,
    )

    // 红石通量线圈
    removeOutput('thermal:rf_coil')
    custom({
        "type": "thermal:bottler",
        "ingredients": [
            {
                "item": 'spongefactory:induction_coil'
            },
            {
                "fluid": 'spongefactory:molten_signalum',
                "amount": 500
            }
        ],
        "result": [
            {
                "item": 'thermal:rf_coil'
            }
        ]
    })

    // 插件Tier1
    removeOutput('industrialforegoing:speed_addon_1')
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:blank_addon'
            },
            {
                "item": "minecraft:sugar"
            },
            {
                "item": "minecraft:sugar"
            },
            {
                "item": 'thermal:rf_coil'
            },
            {
                "item": 'thermal:rf_coil'
            }
        ],
        "inputFluid": "{Amount:500,FluidName:\"spongefactory:chorus_oil\"}",
        "output": {
            "count": 1,
            "item": "industrialforegoing:speed_addon_1",
            "nbt": "{TitaniumAugment:{Speed:2.0f}}"
        },
        "processingTime": 200
    })
    removeOutput('industrialforegoing:efficiency_addon_1')
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:blank_addon'
            },
            {
                "item": 'thermal:rf_coil'
            },
            {
                "item": 'thermal:rf_coil'
            },
            {
                "item": "minecraft:blaze_rod"
            },
            {
                "item": "minecraft:blaze_rod"
            }
        ],
        "inputFluid": "{Amount:500,FluidName:\"spongefactory:chorus_oil\"}",
        "output": {
            "count": 1,
            "item": "industrialforegoing:efficiency_addon_1",
            "nbt": "{TitaniumAugment:{Efficiency:0.9f}}"
        },
        "processingTime": 200
    })
    removeOutput("industrialforegoing:processing_addon_1")
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:blank_addon'
            },
            {
                "item": 'thermal:rf_coil'
            },
            {
                "item": 'thermal:rf_coil'
            },
            {
                "item": "minecraft:furnace"
            },
            {
                "item": "minecraft:crafting_table"
            }
        ],
        "inputFluid": "{Amount:500,FluidName:\"spongefactory:chorus_oil\"}",
        "output": {
            "count": 1,
            "item": "industrialforegoing:processing_addon_1",
            "nbt": "{TitaniumAugment:{Processing:2.0f}}"
        },
        "processingTime": 200
    })

    // 范围升级
    let rangeAddonMaterial = [
        'minecraft:copper_ingot',
        'minecraft:iron_ingot',
        'minecraft:gold_ingot',
        'minecraft:diamond',
        'minecraft:netherite_ingot',
        'minecraft:nether_star',
        'minecraft:dragon_egg',
        'minecraft:netherite_block',
        'mysticalagriculture:tertium_ingot_block',
        'mysticalagriculture:imperium_ingot_block',
        'mysticalagriculture:supremium_ingot_block',
        'mysticalagradditions:insanium_ingot_block'
    ]
    for (let i = 0; i <= 11; i++) {
        removeOutput('industrialforegoing:range_addon' + i)
        if (i === 0) {
            custom({
                "type": "industrialforegoing:dissolution_chamber",
                "input": [
                    {
                        "item": 'spongefactory:blank_addon'
                    },
                    {
                        "item": 'spongefactory:chorus_butter'
                    },
                    {
                        "item": 'spongefactory:chorus_butter'
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    }
                ],
                "inputFluid": "{Amount:500,FluidName:\"spongefactory:chorus_juice\"}",
                "output": {
                    "count": 1,
                    "item": "industrialforegoing:range_addon" + i,
                    "nbt": "{TitaniumAugment:{Range:" + i + ".0f}}"
                },
                "processingTime": (200 * (i + 1))
            })
        } else {
            custom({
                "type": "industrialforegoing:dissolution_chamber",
                "input": [
                    {
                        "item": 'industrialforegoing:range_addon' + (i - 1),
                        "nbt": "{TitaniumAugment:{Range:" + (i - 1) + ".0f}}"
                    },
                    {
                        "item": 'spongefactory:chorus_butter'
                    },
                    {
                        "item": 'spongefactory:chorus_butter'
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    },
                    {
                        "item": rangeAddonMaterial[i]
                    }
                ],
                "inputFluid": "{Amount:500,FluidName:\"spongefactory:chorus_juice\"}",
                "output": {
                    "count": 1,
                    "item": "industrialforegoing:range_addon" + i,
                    "nbt": "{TitaniumAugment:{Range:" + i + ".0f}}"
                },
                "processingTime": (200 * (i + 1))
            })

        }
    }

    // 发射台
    removeOutput('ad_astra:launch_pad')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            " AAA ",
            "AAAAA"
        ],
        "key": {
            "A": {
                "item": "thermal:steel_block"
            }
        },
        "result": {
            "item": 'ad_astra:launch_pad'
        }
    })

    // NASA 工作台
    removeOutput('ad_astra:nasa_workbench')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "  A  ",
            " BCD ",
            " EFG ",
            " FHF ",
            "  F  "
        ],
        "key": {
            "A": {
                "item": "pneumaticcraft:assembly_drill"
            },
            "B": {
                "item": "pneumaticcraft:assembly_laser"
            },
            "C": {
                "item": "pneumaticcraft:assembly_platform"
            },
            "D": {
                "item": "pneumaticcraft:assembly_io_unit_export"
            },
            "E": {
                "item": "pneumaticcraft:assembly_io_unit_import"
            },
            "F": {
                "item": "thermal:signalum_plate"
            },
            "G": {
                "item": "pneumaticcraft:assembly_controller"
            },
            "H": {
                "item": "thermal:steel_block"
            }
        },
        "result": {
            "item": 'ad_astra:nasa_workbench'
        }
    })

    // 末影锭
    removeOutput('extendedcrafting:ender_ingot')
    custom({
        "type": "thermal:bottler",
        "ingredients": [
            {
                "item": 'spongefactory:chorus_ingot'
            },
            {
                "fluid": 'thermal:ender',
                "amount": 500
            }
        ],
        "result": [
            {
                "item": 'extendedcrafting:ender_ingot'
            }
        ]
    })

    // 末影发电机
    removeOutput('extendedcrafting:ender_alternator')
    event.shaped('extendedcrafting:ender_alternator',
        [
            ' S ',
            ' S ',
            'MMM'
        ], {
            M: 'extendedcrafting:ender_ingot_block',
            S: 'minecraft:ender_eye'
        }
    )

    // 药水酿造机
    removeOutput('thermal:machine_brewer')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_elemental:glyph_poison_spores',
            'minecraft:brewing_stand',
            'minecraft:bucket',
            'thermal:rf_coil'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_brewer',
        3000,
    )

    // 流体精炼机
    removeOutput('thermal:machine_refinery')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'toomanyglyphs:glyph_filter_block',
            'pneumaticcraft:refinery',
            'pneumaticcraft:refinery_output',
            'thermal:rf_coil'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_refinery',
        3000,
    )

    // 对二甲苯
    custom({
        "type": "thermal:pyrolyzer",
        "ingredient": {
            "item": 'thermal_extra:sticky_ball'
        },
        "result": [{
            "fluid": 'spongefactory:p_xylene',
            "amount": 50
        }
        ]
    })

    // 对苯二甲酸
    custom({
        "type": "thermal:chiller",
        "ingredients": [
            {
                "fluid": 'spongefactory:p_xylene',
                "amount": 100
            },
            {
                "item": 'thermal:iron_plate'
            }
        ],
        "result": [
            {
                "item": 'spongefactory:terephthalic_acid',
                "count": 1
            }
        ],
        "energy": 1000
    })

    // 苯二甲酰氯
    custom({
        "type": "thermal:brewer",
        "ingredients": [
            {
                "item": 'spongefactory:terephthalic_acid'
            },
            {
                "fluid_tag": 'forge:benzene',
                "amount": 100
            }
        ],
        "result": [
            {
                "fluid": 'spongefactory:phthaloyl_chloride',
                "amount": 100
            }
        ],
        "energy": 1000
    })

    // 对苯二胺
    custom({
        "type": "pneumaticcraft:thermo_plant",
        "air_use_multiplier": 5.0,
        "exothermic": false,
        "fluid_input": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": "immersivepetroleum:benzene"
        },
        "item_output": {
            "item": 'spongefactory:p_phenylenediamine'
        },
        "pressure": 4,
        "speed": 0.1
    })

    // 苯二酐
    custom({
        "type": "pneumaticcraft:fluid_mixer",
        "input1": {
            "type": "pneumaticcraft:fluid",
            "amount": 50,
            "fluid": 'spongefactory:nitric_acid'
        },
        "input2": {
            "type": "pneumaticcraft:fluid",
            "amount": 100,
            "fluid": "immersivepetroleum:benzene"
        },
        "item_output": {
            "item": 'spongefactory:phthalic_anhydride'
        },
        "pressure": 4,
        "time": 20
    })

    // Kevlar
    custom({
        "type": "thermal:crystallizer",
        "ingredients": [
            {
                "fluid": 'spongefactory:phthaloyl_chloride',
                "amount": 1000
            },
            {
                "item": 'spongefactory:p_phenylenediamine'
            },
            {
                "item": 'minecraft:white_dye'
            }
        ],
        "result": [
            {
                "item": 'spongefactory:kevlar'
            }
        ]
    })

    // Kapton
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'spongefactory:phthalic_anhydride'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'spongefactory:p_phenylenediamine'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'minecraft:orange_dye'
                    }
                ],
                "count": 1
            }
        ],
        "result": [
            {
                "item": 'spongefactory:kapton',
                "count": 1
            }
        ],
        "energy": 1800
    })

    // 弹性织物
    event.shaped('spongefactory:elastic_fabric',
        [
            ' M ',
            'MSM',
            ' M '
        ], {
            M: '#forge:string',
            S: 'thermal_extra:sticky_ball'
        }
    )

    // 航天复合面料
    event.shaped('spongefactory:aerospace_composite_fabric',
        [
            'A',
            'S',
            'M'
        ], {
            A: 'spongefactory:kevlar',
            S: 'spongefactory:kapton',
            M: 'spongefactory:elastic_fabric'
        }
    )

    // 航天面罩
    removeOutput('ad_astra:space_helmet')
    event.shaped('ad_astra:space_helmet',
        [
            'SSS',
            'SMS'
        ], {
            S: 'spongefactory:aerospace_composite_fabric',
            M: 'minecraft:glass_pane'
        }
    )
    // 航天服
    removeOutput('ad_astra:space_suit')
    event.shaped('ad_astra:space_suit',
        [
            'SAS',
            'CSC',
            'SSS'
        ], {
            S: 'spongefactory:aerospace_composite_fabric',
            A: 'ad_astra:oxygen_gear',
            C: 'ad_astra:oxygen_tank'
        }
    )
    // 航天裤
    removeOutput('ad_astra:space_pants')
    event.shaped('ad_astra:space_pants',
        [
            'SSS',
            'S S',
            'S S'
        ], {
            S: 'spongefactory:aerospace_composite_fabric'
        }
    )
    // 航天靴
    removeOutput('ad_astra:space_boots')
    event.shaped('ad_astra:space_boots',
        [
            'S S',
            'S S'
        ], {
            S: 'spongefactory:aerospace_composite_fabric'
        }
    )

    // 移除所有AE压印器的配方
    event.remove({type: 'ae2:inscriber'})

    // ae电路板
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'ae2:silicon',
                "count": 1
            },
            {
                "item": 'ae2:silicon_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_silicon'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'ae2:silicon',
                "count": 1
            },
            {
                "item": 'spongefactory:universal_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_silicon'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'thermal:lumium_ingot',
                "count": 1
            },
            {
                "item": 'ae2:logic_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_logic_processor'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'extendedcrafting:enhanced_ender_ingot',
                "count": 1
            },
            {
                "item": 'ae2:engineering_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_engineering_processor'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'thermal:enderium_ingot',
                "count": 1
            },
            {
                "item": 'ae2:calculation_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_calculation_processor'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'thermal:lumium_ingot',
                "count": 1
            },
            {
                "item": 'spongefactory:universal_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_logic_processor'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'extendedcrafting:enhanced_ender_ingot',
                "count": 1
            },
            {
                "item": 'spongefactory:universal_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_engineering_processor'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'thermal:enderium_ingot',
                "count": 1
            },
            {
                "item": 'spongefactory:universal_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:printed_calculation_processor'
            }
        ]
    })

    // 赛特斯石英粉
    event.recipes.thermal.pulverizer('ae2:certus_quartz_dust', '#forge:gems/certus_quartz')

    // 陨石粉
    event.recipes.thermal.pulverizer('ae2:sky_dust', 'ad_astra:sky_stone')
    event.recipes.thermal.pulverizer('ae2:sky_dust', 'ae2:sky_stone_block')

    // 福禄伊克斯粉
    event.recipes.thermal.pulverizer('ae2:fluix_dust', 'ae2:fluix_crystal')

    // 末影粉->末影珍珠粉
    event.replaceInput({}, 'ae2:ender_dust', 'thermal:ender_pearl_dust')

    // 压印模板
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:iron_block',
                "count": 1
            },
            {
                "item": 'ae2:silicon_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:silicon_press'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:iron_block',
                "count": 1
            },
            {
                "item": 'ae2:logic_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:logic_processor_press'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:iron_block',
                "count": 1
            },
            {
                "item": 'ae2:engineering_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:engineering_processor_press'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:iron_block',
                "count": 1
            },
            {
                "item": 'ae2:calculation_processor_press'
            }
        ],
        "result": [
            {
                "item": 'ae2:calculation_processor_press'
            }
        ]
    })
    custom({
        "type": "thermal:press",
        "ingredients": [
            {
                "item": 'minecraft:iron_block',
                "count": 1
            },
            {
                "item": 'spongefactory:universal_press'
            }
        ],
        "result": [
            {
                "item": 'spongefactory:universal_press'
            }
        ]
    })

    // ae处理器
    let aeProcessorTypes = ["calculation", "engineering", "logic"]
    for (let type of aeProcessorTypes) {
        custom({
            "type": "thermal:smelter",
            "ingredients": [
                {
                    "value": [
                        {
                            "item": 'minecraft:redstone'
                        }
                    ],
                    "count": 1
                },
                {
                    "value": [
                        {
                            "item": 'ae2:printed_' + type + '_processor'
                        }
                    ],
                    "count": 1
                },
                {
                    "value": [
                        {
                            "item": 'ae2:printed_silicon'
                        }
                    ],
                    "count": 1
                }
            ],
            "result": [
                {
                    "item": 'ae2:' + type + '_processor',
                    "count": 1
                }
            ],
            "energy": 3000
        })
    }

    // MEGA大宗
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'ae2:singularity'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'ae2:cell_component_256k'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'mekanism:radioactive_waste_barrel'
                    }
                ],
                "count": 1
            }
        ],
        "result": [
            {
                "item": 'megacells:radioactive_cell_component',
                "count": 1
            }
        ],
        "energy": 3000
    })

    // 通用压印模板
    event.shapeless('spongefactory:universal_press', ['ae2:silicon_press', 'ae2:logic_processor_press', 'ae2:engineering_processor_press', 'ae2:calculation_processor_press'])

    // MEGA放射性
    custom({
        "type": "thermal:smelter",
        "ingredients": [
            {
                "value": [
                    {
                        "item": 'ae2:singularity'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'megacells:cell_component_16m'
                    }
                ],
                "count": 1
            },
            {
                "value": [
                    {
                        "item": 'ae2:spatial_cell_component_16'
                    }
                ],
                "count": 1
            }
        ],
        "result": [
            {
                "item": 'megacells:bulk_cell_component',
                "count": 1
            }
        ],
        "energy": 3000
    })

    // 砍伐之魔符
    removeOutput('ars_nouveau:glyph_fell')
    custom({
        "type": "extendedcrafting:shapeless_ender_crafter",
        "ingredients": [
            {
                "item": "thermal:saw_blade"
            },
            {
                "item": "ars_nouveau:earth_essence"
            },
            {
                "type": "forge:nbt",
                "item": "minecraft:diamond_axe",
                "count": 1
            }
        ],
        "result": {
            "item": 'ars_nouveau:glyph_fell'
        }
    })

    // 锯木机
    removeOutput('thermal:machine_sawmill')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_fell',
            'thermal:saw_blade',
            'ars_nouveau:glyph_split',
            'thermal:rf_coil'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_sawmill',
        3000,
    )

    // 压印模板
    custom({
        "type": "thermal:sawmill",
        "ingredient": {
            "item": 'ae2:mysterious_cube'
        },
        "result": [
            {
                "item": 'ae2:silicon_press',
                "count": 1,
                "chance": 0.5
            },
            {
                "item": 'ae2:logic_processor_press',
                "count": 1,
                "chance": 0.5
            },
            {
                "item": 'ae2:engineering_processor_press',
                "count": 1,
                "chance": 0.5
            },
            {
                "item": 'ae2:calculation_processor_press',
                "count": 1,
                "chance": 0.5
            }
        ],
        "energy": 5000
    })

    // 火箭控制电路
    const enderiumPlate = 'thermal:enderium_plate'
    event.recipes.create.sequenced_assembly('spongefactory:rocket_control_circuit', enderiumPlate, [
        event.recipes.createDeploying(enderiumPlate, [enderiumPlate, 'ae2:engineering_processor']),
        event.recipes.createDeploying(enderiumPlate, [enderiumPlate, 'ae2:logic_processor']),
        event.recipes.createDeploying(enderiumPlate, [enderiumPlate, 'ae2:calculation_processor']),
    ]).transitionalItem(enderiumPlate).loops(4)

    // 火箭鼻锥
    removeOutput('ad_astra:rocket_nose_cone')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "  A  ",
            " ABA ",
            "  C  ",
            " CBC ",
            "CCCCC"
        ],
        "key": {
            "A": {
                "item": "thermal:signalum_plate"
            },
            "B": {
                "item": "spongefactory:rocket_control_circuit"
            },
            "C": {
                "item": "thermal:steel_plate"
            }
        },
        "result": {
            "item": 'ad_astra:rocket_nose_cone'
        }
    })

    // 火箭尾翼
    removeOutput('ad_astra:rocket_fin')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            "  A  ",
            " ABA ",
            "ABABA",
            "AA AA",
            "A   A"
        ],
        "key": {
            "A": {
                "item": "thermal:steel_plate"
            },
            "B": {
                "item": "spongefactory:rocket_control_circuit"
            }
        },
        "result": {
            "item": 'ad_astra:rocket_fin'
        }
    })

    // 钢引擎
    removeOutput('ad_astra:steel_engine')
    custom({
        "type": "extendedcrafting:shaped_table",
        "pattern": [
            " AAA ",
            "ABCBA",
            "ABCBA",
            " ADA ",
            "A   A"
        ],
        "key": {
            "A": {
                "item": "thermal:steel_plate"
            },
            "B": {
                "item": "spongefactory:rocket_control_circuit"
            },
            "C": {
                "item": "ad_astra:engine_frame"
            },
            "D": {
                "item": "ad_astra:engine_fan"
            }
        },
        "result": {
            "item": 'ad_astra:steel_engine'
        }
    })

    // 氧化钠
    event.smelting('spongefactory:sodium_oxide', 'spongefactory:sodium_ingot')
    // 过氧化钠
    event.smelting('spongefactory:sodium_peroxide', 'spongefactory:sodium_oxide')

    // 氧气装载机
    removeOutput('ad_astra:oxygen_loader')
    event.shaped('ad_astra:oxygen_loader',
        [
            'SBS',
            'CDC',
            'SBS'
        ], {
            S: 'thermal:steel_plate',
            B: 'spongefactory:sodium_peroxide',
            C: 'ad_astra:oxygen_tank',
            D: 'thermal:machine_bottler'
        }
    )

    // 洗矿场
    removeOutput('industrialforegoing:washing_factory')
    // 发酵站
    removeOutput('industrialforegoing:fermentation_station')

    // 石英玻璃
    removeOutput('ae2:quartz_glass')
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "tag": "ae2:all_quartz_dust"
            },
            "b": {
                "item": 'minecraft:glass'
            }
        },
        "pattern": [
            "aba",
            "bab",
            "aba"
        ],
        "result": {
            "count": 2,
            "item": "ae2:quartz_glass"
        }
    })
    // 聚能石英玻璃
    removeOutput('ae2:quartz_vibrant_glass')
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "item": "minecraft:glowstone_dust"
            },
            "b": {
                "item": "ae2:quartz_glass"
            },
            "c": {
                "tag": 'spongefactory:polished_corundum'
            }
        },
        "pattern": [
            " c ",
            "aba",
            " c "
        ],
        "result": {
            "item": "ae2:quartz_vibrant_glass"
        }
    })
    // 照明面板
    removeOutput("ae2:semi_dark_monitor")
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "tag": "forge:dusts/glowstone"
            },
            "b": {
                "item": 'ae2:quartz_vibrant_glass'
            },
            "c": {
                "tag": 'forge:ingots/desh'
            },
            "d": {
                "tag": "forge:dusts/redstone"
            }
        },
        "pattern": [
            " ab",
            "cdb",
            " ab"
        ],
        "result": {
            "count": 3,
            "item": "ae2:semi_dark_monitor"
        }
    })

    // 陨石罗盘
    removeOutput('ae2:meteorite_compass')
    custom({
        "type": "architects_palette:warping",
        "ingredient": [
            {
                "item": 'naturescompass:naturescompass'
            }
        ],
        "result": {
            "item": 'ae2:meteorite_compass'
        },
        "dimension": "minecraft:the_end"
    })

    // 锌板
    removeOutput('#forge:plates/zinc')
    pressMetalToPlate('create:zinc_ingot', 'createaddition:zinc_sheet')

    // 福禄伊克斯水晶
    event.remove({id: "create:compat/ae2/mixing/fluix_crystal"})
    event.remove({id: "ae2:transform/fluix_crystals"})
    event.remove({id: "ae2:transform/fluix_crystal"})
    custom({
        "type": "thermal:crystallizer",
        "ingredients": [
            {
                "fluid": "minecraft:water",
                "amount": 2000
            },
            {
                "tag": 'forge:dusts/fluix'
            }
        ],
        "result": [
            {
                "item": 'ae2:fluix_crystal'
            }
        ]
    })

    // 离心分离机
    removeOutput('thermal:machine_centrifuge')
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_rotate',
            'immersiveengineering:turntable',
            'ad_astra:desh_plate',
            'spongefactory:desh_coil'
        ],
        'spongefactory:advanced_machine_frame',
        'thermal:machine_centrifuge',
        3000,
    )

    // 福禄伊克斯粉
    custom({
        "type": "thermal:centrifuge",
        "ingredient": {
            "item": 'ad_astra:moon_sand'
        },
        "result": [
            {
                "item": 'minecraft:gravel',
                "chance": 1
            },
            {
                "item": 'ae2:fluix_dust',
                "chance": 0.25
            }
        ],
        "energy": 10000
    })

    // 月沙
    custom({
        "type": "thermal:rock_gen",
        "adjacent": 'minecraft:blue_ice',
        "below": 'ad_astra:moon_stone',
        "result": {
            "item": 'ad_astra:moon_sand'
        }
    })
    custom({
        "type": "mekanism:crushing",
        "input": {
            "ingredient": {
                "item": 'ad_astra:moon_cobblestone'
            }
        },
        "output": {
            "item": 'ad_astra:moon_sand'
        }
    })
    // 月石
    custom({
        "type": "thermal:rock_gen",
        "adjacent": 'minecraft:water',
        "below": 'ad_astra:moon_stone',
        "result": {
            "item": 'ad_astra:moon_stone'
        }
    })

    // 石英纤维
    removeOutput('ae2:quartz_fiber')
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "item": "ae2:quartz_glass"
            },
            "b": {
                "item": 'ae2:fluix_dust'
            }
        },
        "pattern": [
            "aaa",
            "bbb",
            "aaa"
        ],
        "result": {
            "count": 3,
            "item": "ae2:quartz_fiber"
        }
    })

    // ME箱子
    removeOutput('ae2:chest')
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "item": 'ae2:quartz_vibrant_glass'
            },
            "b": {
                "item": "ae2:terminal"
            },
            "c": {
                "item": "ae2:fluix_glass_cable"
            },
            "d": {
                "item": 'ad_astra:desh_ingot'
            },
            "e": {
                "item": 'ad_astra:desh_plate'
            }
        },
        "pattern": [
            "aba",
            "c c",
            "ded"
        ],
        "result": {
            "item": "ae2:chest"
        }
    })

    // 熔融戴斯
    moltenIngot('ad_astra:desh_ingot', 'spongefactory:molten_desh')

    // 戴斯线圈
    custom({
        "type": "thermal:bottler",
        "ingredients": [
            {
                "item": 'spongefactory:induction_coil'
            },
            {
                "fluid": 'spongefactory:molten_desh',
                "amount": 500
            }
        ],
        "result": [
            {
                "item": 'spongefactory:desh_coil'
            }
        ]
    })

    // 中级机器框架
    removeOutput('industrialforegoing:machine_frame_simple')
    event.recipes.thermal.smelter('industrialforegoing:machine_frame_simple', ['2x spongefactory:desh_coil', 'industrialforegoing:machine_frame_pity'])

    // 屠宰场
    removeOutput('industrialforegoing:mob_slaughter_factory')
    event.shaped('industrialforegoing:mob_slaughter_factory',
        [
            'PPP',
            'PCP',
            'PSP'
        ], {
            C: 'industrialforegoing:machine_frame_simple',
            S: 'industrialforegoing:fluid_extractor',
            P: 'mob_grinding_utils:saw'
        }
    )

    // IF各种工具
    removeOutput('industrialforegoing:meat_feeder')
    removeOutput('industrialforegoing:infinity_launcher')
    removeOutput("industrialforegoing:infinity_trident")
    removeOutput("industrialforegoing:infinity_saw")
    removeOutput("industrialforegoing:infinity_backpack")
    removeOutput("industrialforegoing:infinity_hammer")
    removeOutput("industrialforegoing:infinity_drill")
    removeOutput("industrialforegoing:infinity_nuke")
    removeOutput("industrialforegoing:mob_imprisonment_tool")

    // 发电机
    removeOutput('industrialforegoing:bioreactor')
    removeOutput('industrialforegoing:biofuel_generator')
    removeOutput('industrialforegoing:mycelial_reactor')
    removeOutput('industrialforegoing:mycelial_furnace')
    removeOutput('industrialforegoing:mycelial_slimey')
    removeOutput('industrialforegoing:mycelial_culinary')
    removeOutput('industrialforegoing:mycelial_potion')
    removeOutput('industrialforegoing:mycelial_disenchantment')
    removeOutput('industrialforegoing:mycelial_ender')
    removeOutput('industrialforegoing:mycelial_explosive')
    removeOutput('industrialforegoing:mycelial_frosty')
    removeOutput('industrialforegoing:mycelial_halitosis')
    removeOutput('industrialforegoing:mycelial_magma')
    removeOutput('industrialforegoing:mycelial_pink')
    removeOutput('industrialforegoing:mycelial_netherstar')
    removeOutput('industrialforegoing:mycelial_death')
    removeOutput('industrialforegoing:mycelial_rocket')
    removeOutput('industrialforegoing:mycelial_crimed')
    removeOutput('industrialforegoing:mycelial_meatallurgic')

    // 存储与运输
    removeOutput('industrialforegoing:conveyor')
    removeOutput('industrialforegoing:common_black_hole_unit')
    removeOutput('industrialforegoing:pity_black_hole_unit')
    removeOutput('industrialforegoing:simple_black_hole_unit')
    removeOutput('industrialforegoing:advanced_black_hole_unit')
    removeOutput('industrialforegoing:supreme_black_hole_unit')
    removeOutput('industrialforegoing:common_black_hole_tank')
    removeOutput('industrialforegoing:pity_black_hole_tank')
    removeOutput('industrialforegoing:simple_black_hole_tank')
    removeOutput('industrialforegoing:advanced_black_hole_tank')
    removeOutput('industrialforegoing:supreme_black_hole_tank')
    removeOutput('industrialforegoing:black_hole_controller')
    removeOutput('industrialforegoing:item_transporter_type')
    removeOutput('industrialforegoing:fluid_transporter_type')
    removeOutput('industrialforegoing:world_transporter_type')

    // 冶金灌注机
    removeOutput('mekanism:metallurgic_infuser')
    event.shaped('mekanism:metallurgic_infuser',
        [
            'SMS',
            'PCL',
            'SSS'
        ], {
            C: 'industrialforegoing:machine_frame_simple',
            S: 'industrialforegoing:pink_slime_ingot',
            P: 'thermal:machine_bottler',
            M: 'thermal:machine_smelter',
            L: 'thermal:machine_furnace',
        }
    )

    // 电解核心
    removeOutput('mekanism:electrolytic_core')
    event.shaped('mekanism:electrolytic_core',
        [
            'SMS',
            'PSL',
            'S S'
        ], {
            S: 'mekanism:alloy_infused',
            P: 'thermal:iron_dust',
            L: 'thermal:gold_dust',
            M: 'spongefactory:desh_coil'
        }
    )

    // 电解分离器
    removeOutput('mekanism:electrolytic_separator')
    event.shaped('mekanism:electrolytic_separator',
        [
            'SMS',
            'LBL',
            'SOS'
        ], {
            S: 'minecraft:iron_ingot',
            M: 'mekanism:electrolytic_core',
            B: 'industrialforegoing:machine_frame_simple',
            L: 'mekanism:alloy_infused',
            O: 'minecraft:redstone'
        }
    )

    // 基础加压管道
    removeOutput('mekanism:basic_pressurized_tube')
    event.shaped('8x mekanism:basic_pressurized_tube',
        [
            'SMS',
        ], {
            S: 'thermal:steel_ingot',
            M: 'mekanism:alloy_infused'
        }
    )

    // 熔融铝土矿
    custom({
        "type": "thermal:crucible",
        "ingredient": {
            "item": 'spongefactory:ground_aluminum_ore'
        },
        "result": [
            {
                "fluid": 'spongefactory:molten_bauxite',
                "amount": 100
            }
        ],
        "energy": 6000
    })

    // 铝
    custom({
        "type": "mekanism:separating",
        "input": {
            "amount": 2,
            "fluid": 'spongefactory:molten_bauxite'
        },
        "leftGasOutput": {
            "amount": 4,
            "gas": 'spongefactory:aluminum'
        },
        "rightGasOutput": {
            "amount": 3,
            "gas": "mekanism:oxygen"
        }
    })

    // 熔融铝
    moltenIngot('immersiveengineering:ingot_aluminum', 'spongefactory:molten_aluminum')
    custom({
        "type": "mekanism:rotary",
        "fluidInput": {
            "amount": 1,
            "fluid": 'spongefactory:molten_aluminum'
        },
        "fluidOutput": {
            "amount": 1,
            "fluid": 'spongefactory:molten_aluminum'
        },
        "gasInput": {
            "amount": 1,
            "gas": 'spongefactory:aluminum'
        },
        "gasOutput": {
            "amount": 1,
            "gas": 'spongefactory:aluminum'
        }
    })

    // 粗铝
    removeOutput('immersiveengineering:raw_aluminum')
    event.remove({input: 'immersiveengineering:raw_aluminum'})

    // 基础化学品储罐
    removeOutput('mekanism:basic_chemical_tank')
    event.shaped('mekanism:basic_chemical_tank',
        [
            'SMS',
            'M M',
            'SMS'
        ], {
            S: 'spongefactory:titanium_ingot',
            M: 'mekanism:alloy_infused'
        }
    )

    // 回旋式气液转换器
    removeOutput("mekanism:rotary_condensentrator")
    custom({
        "type": "mekanism:mek_data",
        "key": {
            "#": {
                "item": "mekanism:basic_fluid_tank"
            },
            "C": {
                "item": 'spongefactory:desh_coil'
            },
            "E": {
                "item": "mekanism:energy_tablet"
            },
            "G": {
                "tag": "forge:glass"
            },
            "T": {
                "item": "mekanism:basic_chemical_tank"
            }
        },
        "pattern": [
            "GCG",
            "TE#",
            "GCG"
        ],
        "result": {
            "item": "mekanism:rotary_condensentrator"
        }
    })
})