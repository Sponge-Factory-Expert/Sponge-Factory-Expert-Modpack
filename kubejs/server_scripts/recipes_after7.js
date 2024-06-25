ServerEvents.recipes(event => {
    let removeOutput = (output) => {
        event.remove({output: output})
    }

    let custom = (json) => {
        return event.custom(json)
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

    // 合成核心
    event.shaped('2x spongefactory:craft_core',
        [
            ' C ',
            'S B',
            ' C '
        ], {
            S: 'ae2:formation_core',
            B: 'ae2:annihilation_core',
            C: 'immersiveengineering:ingot_aluminum'
        }
    )

    // 控制器
    removeOutput('ae2:controller')
    event.shaped('ae2:controller',
        [
            'MCM',
            'CSC',
            'MCM'
        ], {
            M: 'ae2:smooth_sky_stone_block',
            C: 'ae2:fluix_crystal',
            S: 'spongefactory:craft_core'
        }
    )

    // 接口
    removeOutput('ae2:interface')
    event.shaped('ae2:interface',
        [
            'MCM',
            'S S',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'minecraft:glass',
            S: 'spongefactory:craft_core'
        }
    )

    // 样板供应器
    removeOutput('ae2:pattern_provider')
    event.shaped('ae2:pattern_provider',
        [
            'MCM',
            'S S',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'minecraft:crafting_table',
            S: 'spongefactory:craft_core'
        }
    )

    // 分子装配室
    removeOutput('ae2:molecular_assembler')
    event.shaped('ae2:molecular_assembler',
        [
            'MCM',
            'SRS',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'ae2:quartz_vibrant_glass',
            S: 'spongefactory:craft_core',
            R: 'minecraft:crafting_table'
        }
    )

    // 驱动器
    removeOutput('ae2:drive')
    event.shaped('ae2:drive',
        [
            'MCM',
            'SRS',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'ae2:fluix_crystal',
            S: 'ae2:fluix_glass_cable',
            R: 'spongefactory:craft_core'
        }
    )

    // 合成单元
    removeOutput('ae2:crafting_unit')
    event.shaped('ae2:crafting_unit',
        [
            'MCM',
            'SRS',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'ae2:calculation_processor',
            S: 'ae2:fluix_glass_cable',
            R: 'spongefactory:craft_core'
        }
    )

    // 合成终端
    removeOutput('ae2:crafting_terminal')
    event.shapeless('ae2:crafting_terminal', ['ae2:terminal', 'minecraft:crafting_table', 'spongefactory:craft_core'])

    // 存储组件1k
    removeOutput('ae2:cell_component_1k')
    event.shaped('ae2:cell_component_1k',
        [
            'MCM',
            'CRC',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: '#ae2:all_certus_quartz',
            R: 'spongefactory:craft_core'
        }
    )

    // 输入总线
    removeOutput('ae2:import_bus')
    event.shaped('ae2:import_bus',
        [
            ' R ',
            'MCM'
        ], {
            M: 'mekanism:alloy_infused',
            C: 'minecraft:sticky_piston',
            R: 'spongefactory:craft_core'
        }
    )

    // 输出总线
    removeOutput('ae2:export_bus')
    event.shaped('ae2:export_bus',
        [
            'MCM',
            ' R '
        ], {
            M: 'mekanism:alloy_infused',
            C: 'spongefactory:craft_core',
            R: 'minecraft:piston'
        }
    )

    // IO
    removeOutput("ae2:io_port")
    custom({
        "type": "minecraft:crafting_shaped",
        "key": {
            "a": {
                "tag": "forge:glass"
            },
            "L": {
                "item": 'ae2:import_bus'
            },
            "P": {
                "item": 'ae2:export_bus'
            },
            "c": {
                "item": "ae2:fluix_glass_cable"
            },
            "d": {
                "tag": "forge:ingots/iron"
            },
            "e": {
                "item": "ae2:logic_processor"
            }
        },
        "pattern": [
            "aaa",
            "LcP",
            "ded"
        ],
        "result": {
            "item": "ae2:io_port"
        }
    })

    // 基础卡、高级卡
    event.replaceInput({output: 'ae2:basic_card'}, 'ae2:calculation_processor', 'spongefactory:craft_core')
    event.replaceInput({output: 'ae2:advanced_card'}, 'ae2:calculation_processor', 'spongefactory:craft_core')

    // 无线连接器
    removeOutput('expatternprovider:wireless_connect')
    event.shaped('2x expatternprovider:wireless_connect',
        [
            'SCS',
            'MPM',
            'SCS'
        ], {
            S: 'extendedcrafting:enhanced_ender_ingot',
            P: 'spongefactory:craft_core',
            C: 'ae2:wireless_receiver',
            M: '#ae2:smart_cable'
        }
    )

    // 熔融下界合金
    moltenIngot('minecraft:netherite_ingot', 'spongefactory:molten_netherite')
    // 熔融镍
    moltenIngot('thermal:nickel_ingot', 'spongefactory:molten_nickel')

    // 熔融物质
    custom({
        "type": "thermal:crucible",
        "ingredient": {
            "item": 'ae2:matter_ball'
        },
        "result": [
            {
                "fluid": 'spongefactory:molten_matter',
                "amount": 100
            }
        ],
        "energy": 8000
    })
    // 物质
    custom({
        "type": "mekanism:rotary",
        "fluidInput": {
            "amount": 1,
            "fluid": 'spongefactory:molten_matter'
        },
        "fluidOutput": {
            "amount": 1,
            "fluid": 'spongefactory:molten_matter'
        },
        "gasInput": {
            "amount": 1,
            "gas": 'spongefactory:matter'
        },
        "gasOutput": {
            "amount": 1,
            "gas": 'spongefactory:matter'
        }
    })

    // 高级机器框架
    removeOutput("industrialforegoing:machine_frame_advanced")
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'spongefactory:desh_coil'
            },
            {
                "tag": "industrialforegoing:machine_frame/simple"
            },
            {
                "item": 'spongefactory:desh_coil'
            },
            {
                "item": 'minecraft:netherite_ingot'
            },
            {
                "item": 'minecraft:netherite_ingot'
            },
            {
                "item": 'industrialforegoing:pink_slime_ingot'
            },
            {
                "tag": "forge:gears/diamond"
            },
            {
                "item": 'industrialforegoing:pink_slime_ingot'
            }
        ],
        "inputFluid": "{Amount:1000,FluidName:\"spongefactory:molten_matter\"}",
        "output": {
            "count": 1,
            "item": "industrialforegoing:machine_frame_advanced"
        },
        "processingTime": 300
    })

    // 镭射钻
    removeOutput('industrialforegoing:laser_drill')
    event.shaped('industrialforegoing:laser_drill',
        [
            'SCS',
            'MPM',
            'SCS'
        ], {
            S: 'pneumaticcraft:printed_circuit_board',
            P: 'industrialforegoing:machine_frame_simple',
            C: 'pneumaticcraft:drill_bit_netherite',
            M: 'minecraft:piston'
        }
    )

    // 流体镭射钻基座
    removeOutput('industrialforegoing:fluid_laser_base')
    event.shaped('industrialforegoing:fluid_laser_base',
        [
            'STS',
            'MPM',
            'SCS'
        ], {
            T: 'minecraft:diamond_pickaxe',
            P: "industrialforegoing:machine_frame_advanced",
            S: 'thermal:diamond_gear',
            M: 'mekanism:alloy_infused',
            C: 'minecraft:bucket'
        }
    )

    // 冷凝室
    removeOutput('industrialforegoing:stasis_chamber')
    event.shaped('industrialforegoing:stasis_chamber',
        [
            'FFF',
            'MPM',
            'SCS'
        ], {
            F: 'minecraft:soul_sand',
            P: "industrialforegoing:machine_frame_advanced",
            M: 'minecraft:ghast_tear',
            S: Item.of('industrialforegoing:range_addon2', '{TitaniumAugment:{Range:2.0f}}').weakNBT(),
            C: 'thermal:machine_chiller'
        }
    )

    // 超级机器框架
    removeOutput("industrialforegoing:machine_frame_supreme")
    custom({
        "type": "industrialforegoing:dissolution_chamber",
        "input": [
            {
                "item": 'thermal:steel_plate'
            },
            {
                "tag": "industrialforegoing:machine_frame/advanced"
            },
            {
                "item": 'thermal:steel_plate'
            },
            {
                "item": "minecraft:netherite_ingot"
            },
            {
                "item": "minecraft:netherite_ingot"
            },
            {
                "tag": "forge:gems/diamond"
            },
            {
                "tag": "forge:gears/diamond"
            },
            {
                "tag": "forge:gems/diamond"
            }
        ],
        "inputFluid": "{Amount:135,FluidName:\"industrialforegoing:ether_gas\"}",
        "output": {
            "count": 1,
            "item": "industrialforegoing:machine_frame_supreme"
        },
        "processingTime": 300
    })

    // 颜料提取器
    removeOutput('mekanism:pigment_extractor')
    event.shaped('mekanism:pigment_extractor',
        [
            'SFS',
            'MPM',
            'SFS'
        ], {
            S: 'minecraft:redstone',
            P: "industrialforegoing:machine_frame_supreme",
            M: 'minecraft:flint',
            F: 'thermal:device_tree_extractor'
        }
    )

    // 上色机
    removeOutput('mekanism:painting_machine')
    event.shaped('mekanism:painting_machine',
        [
            'SFS',
            'MPM',
            'SFS'
        ], {
            S: 'mekanism:alloy_infused',
            P: "industrialforegoing:machine_frame_supreme",
            M: 'mekanism:dye_base',
            F: 'thermal:machine_bottler'
        }
    )

    // 基础控制电路
    removeOutput('mekanism:basic_control_circuit')
    custom({
        "type": "mekanism:painting",
        "chemicalInput": {
            "amount": 2048,
            "pigment": "mekanism:lime"
        },
        "itemInput": {
            "ingredient": {
                "item": 'ae2:matter_ball'
            }
        },
        "output": {
            "item": 'mekanism:basic_control_circuit'
        }
    })

    // 一氧化碳
    custom({
        "type": "mekanism:oxidizing",
        "input": {
            "ingredient": {
                "item": 'mekanism:dust_charcoal'
            }
        },
        "output": {
            "amount": 100,
            "gas": "spongefactory:carbon_monoxide"
        }
    })

    // 氧化镍
    custom({
        "type": "mekanism:oxidizing",
        "input": {
            "ingredient": {
                "item": 'spongefactory:ground_nickel_ore'
            }
        },
        "output": {
            "amount": 100,
            "gas": "spongefactory:nickel_oxide"
        }
    })

    // 化学灌注机
    event.replaceInput({output: 'mekanism:chemical_infuser'}, 'mekanism:steel_casing', 'industrialforegoing:machine_frame_supreme')

    // 四羰基镍
    custom({
        "type": "mekanism:chemical_infusing",
        "leftInput": {
            "amount": 1,
            "gas": "spongefactory:nickel_oxide"
        },
        "output": {
            "amount": 1,
            "gas": "spongefactory:nickel_tetracarbonyl"
        },
        "rightInput": {
            "amount": 5,
            "gas": "spongefactory:carbon_monoxide"
        }
    })

    // 移除测试配方
    event.remove({id: 'spongefactory:bedrock'})
    // 镍粉
    custom({
        "type": "spongefactory:fluidized_bed_reactor",
        "duration": 100,
        "gasInput": {
            "amount": 100,
            "gas": "spongefactory:nickel_tetracarbonyl"
        },
        "gasOutput": {
            "amount": 400,
            "gas": "spongefactory:carbon_monoxide"
        },
        "itemOutput": {
            "item": 'thermal:nickel_dust'

        }
    })

    // 流化床反应室
    event.shaped('spongefactory:fluidized_bed_reactor',
        [
            'SFS',
            'MPM',
            'SRS'
        ], {
            S: 'mekanism:alloy_infused',
            P: 'mekanism:chemical_infuser',
            M: 'mekanism:basic_chemical_tank',
            F: 'toomanyglyphs:glyph_filter_item',
            R: 'spongefactory:high_temperature_deposition_substrate'
        }
    )

    // 动物排污机
    removeOutput('industrialforegoing:sewer')
    event.shaped('industrialforegoing:sewer',
        [
            'SFS',
            'MPM',
            'MRM'
        ], {
            S: 'mekanism:alloy_infused',
            P: 'industrialforegoing:machine_frame_supreme',
            M: 'minecraft:brick',
            F: 'thermal:device_tree_extractor',
            R: 'thermal:iron_gear'
        }
    )

    // 污水堆肥机
    removeOutput('industrialforegoing:sewage_composter')
    event.shaped('industrialforegoing:sewage_composter',
        [
            'SFS',
            'XPX',
            'MRM'
        ], {
            F: 'thermal:device_composter',
            P: 'industrialforegoing:machine_frame_supreme',
            M: 'minecraft:brick',
            S: 'mekanism:alloy_infused',
            R: 'thermal:iron_gear',
            X: 'minecraft:piston'
        }
    )

    // 花肥
    removeOutput('botania:fertilizer')
    event.shaped('4x botania:fertilizer',
        [
            'SXS',
            'XSX',
            'SXS'
        ], {
            S: 'industrialforegoing:fertilizer',
            X: 'spongefactory:holy_shit'
        }
    )

    // 花药台
    let apothecaryTypes = ['default', 'forest', 'plains', 'mountain', 'fungal', 'swamp', 'desert', 'taiga', 'mesa', 'mossy', 'livingrock', 'deepslate']
    for (let type of apothecaryTypes) {
        let apothecaryId = 'botania:apothecary_' + type
        event.replaceInput({output: apothecaryId}, '#botania:petals', 'botania:fertilizer')
    }
    event.replaceInput({output: 'botanicalmachinery:mechanical_apothecary'}, 'botania:apothecary_default', '#spongefactory:apothecary')

    // 魔源石
    custom({
        "type": "thermal:rock_gen",
        "adjacent": 'ars_nouveau:source_gem_block',
        "result": {
            "item": 'ars_nouveau:sourcestone'
        }
    })

    // 活石
    event.remove({id: 'botania:pure_daisy/livingrock'})
    event.remove({id: 'productivebees:block_conversion/botania/stone_to_livingrock'})
    custom({
        "type": "botania:pure_daisy",
        "input": {
            "type": "block",
            "block": 'ars_nouveau:sourcestone'
        },
        "output": {
            "name": "botania:livingrock"
        }
    })
    custom({
        "type": "productivebees:block_conversion",
        "bee": "productivebees:pure",
        "from": {
            "Name": 'ars_nouveau:sourcestone'
        },
        "to": {
            "Name": "botania:livingrock"
        },
        "conditions": [
            {
                "type": "forge:mod_loaded",
                "modid": "botania"
            },
            {
                "type": "productivebees:bee_exists",
                "bee": "productivebees:pure"
            }
        ]
    })

    // 魔力钢
    event.remove({id: 'botania:mana_infusion/manasteel'})
    event.remove({id: 'botania:mana_infusion/manasteel_block'})
    custom({
        "type": "botania:mana_infusion",
        "input": {
            "item": 'spongefactory:ferromagnetic_material'
        },
        "mana": 3000,
        "output": {
            "item": "botania:manasteel_ingot"
        }
    })

    // 电磁屏蔽机器框架
    event.shaped('spongefactory:electromagnetic_shielding_machine_frame',
        [
            ' X ',
            'XSX',
            ' X '
        ], {
            S: 'spongefactory:advanced_machine_frame',
            X: 'botania:manasteel_ingot'
        }
    )

    // 充磁机
    event.recipes.ars_nouveau.enchanting_apparatus(
        [
            'ars_nouveau:glyph_rotate',
            'spongefactory:magnet_wire',
            'botania:manasteel_ingot',
            'ars_nouveau:glyph_pull'
        ],
        'spongefactory:electromagnetic_shielding_machine_frame',
        'spongefactory:machine_magnetizer',
        3000,
    )

    // 符文祭坛
    removeOutput('botania:runic_altar')
    event.shaped('botania:runic_altar',
        [
            'XXX',
            'XSX'
        ], {
            S: 'botania:manasteel_block',
            X: 'botania:livingrock'
        }
    )

    // 魔力场锭
    custom({
        "type": "spongefactory:magnetizer",
        "ingredients": [
            {
                "item": 'botania:manasteel_ingot'
            }
        ],
        "result": [
            {
                "item": 'spongefactory:mana_field_ingot'
            }
        ]
    })

    // 空白数据模型
    removeOutput('hostilenetworks:blank_data_model')
    event.shaped('hostilenetworks:blank_data_model',
        [
            'XXX',
            'XSX',
            'XXX'
        ], {
            S: 'minecraft:smooth_stone',
            X: 'spongefactory:mana_field_ingot'
        }
    )

    // 神秘植物学的符文
    removeOutput('mythicbotany:midgard_rune')
    removeOutput('mythicbotany:alfheim_rune')
    removeOutput('mythicbotany:vanaheim_rune')
    removeOutput('mythicbotany:asgard_rune')
    removeOutput('mythicbotany:joetunheim_rune')
    removeOutput('mythicbotany:muspelheim_rune')
    removeOutput('mythicbotany:niflheim_rune')
    removeOutput('mythicbotany:helheim_rune')
    removeOutput('mythicbotany:nidavellir_rune')

    // 魔力符文
    removeOutput('botania:rune_mana')
    custom({
        "type": "botania:runic_altar",
        "ingredients": [
            {
                "item": 'botania:mana_diamond'
            },
            {
                "tag": "botania:manasteel_ingots"
            },
            {
                "item": 'botanicalmachinery:mana_emerald'
            },
            {
                "item": 'botania:mana_bottle'
            },
            {
                "item": 'botania:mana_string'
            },
            {
                "item": "botania:mana_pearl"
            },
            {
                "item": 'botania:mana_glass'
            },
            {
                "item":'botania:mana_powder'
            },
            {
                "item": 'botania:quartz_mana'
            },
            {
                "item": 'spongefactory:mana_field_ingot'
            }
        ],
        "mana": 8000,
        "output": {
            "item": "botania:rune_mana"
        }
    })

    // 魔力池
    removeOutput('botania:mana_pool')
    event.shaped('botania:mana_pool',
        [
            'XSX',
            'XXX'
        ], {
            S: 'botania:rune_mana',
            X: 'botania:livingrock'
        }
    )
})