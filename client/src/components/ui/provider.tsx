"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { CustomSystem } from "../../theme/theme.ts"


export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={CustomSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
