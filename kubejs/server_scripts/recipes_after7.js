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
            F:'minecraft:soul_sand',
            P:"industrialforegoing:machine_frame_advanced",
            M:'minecraft:ghast_tear',
            S:'industrialforegoing:range_addon2',
            C:'thermal:machine_chiller'
        }
    )
})