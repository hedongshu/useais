import type { GlobalThemeOverrides } from 'naive-ui'
import { Ref } from 'vue'

export default function useNaiveTheme() {
  const naiveThemeState: Ref<Readonly<GlobalThemeOverrides>> = useState(
    'naive_theme_overrides'
  )
  return naiveThemeState
}
