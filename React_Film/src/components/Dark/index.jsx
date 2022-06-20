import { Switch, useDarkreader } from "react-darkreader"

export default function Dark() {
  const [isDark, { toggle }] = useDarkreader(false)
  return <Switch checked={isDark} onChange={toggle} />
}
