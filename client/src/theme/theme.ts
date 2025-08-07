import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
    theme: {
        semanticTokens: {
            colors: {
                "bg": {
                    value: {
                        _light: "#FFF2C2",         
                        _dark: "#18122B",           
                    }
                },
                "surface": {
                    value: {
                        _light: "#FFFDF0",
                        _dark: "#443C68"
                    }
                },
                "text": {
                    value: {
                        _light: "#1A202C",
                        _dark: "#ffffffff"
                    }
                },
                "muted": {
                    value: {
                        _light: "#d8d4bdff",
                        _dark: "#3d2e6dff"
                    }
                },
                "primary": {
                    value: {
                        _light: "#3B82F6",         
                        _dark: "#60A5FA"
                    }
                },
                "primaryHover": {
                    value: {
                        _light: "#2563EB",
                        _dark: "#3B82F6"
                    }
                },
                "accent": {
                    value: {
                        _light: "#EFF3EA",         
                        _dark: "#635985"
                    }
                },
                "accentHover": {
                    value: {
                        _light: "#6D28D9",
                        _dark: "#8B5CF6"
                    }
                },
                "border": {
                    value: {
                        _light: "#CBD5E0",
                        _dark: "#2D3748"
                    }
                },
                "danger": {
                    value: {
                        _light: "#E53E3E",
                        _dark: "#FC8181"
                    }
                },
                "success": {
                    value: {
                        _light: "#38A169",
                        _dark: "#68D391"
                    }
                },
            },
        },
    }
})

//export default customConfig;
export const CustomSystem = createSystem(defaultConfig, customConfig);
