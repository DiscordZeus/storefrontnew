import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  'data-testid'?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  'data-testid': dataTestId
}) => {

  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">اختر {title}</span>
      <div className="flex flex-wrap justify-between gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return (
            <button
  onClick={() => updateOption({ [option.id]: v })}
  key={v}
  className={clx(
    "border-ui-border-base bg-ui-bg-subtle border text-small-regular h-auto min-h-10 rounded-rounded p-2 flex-1 flex items-center justify-center whitespace-normal break-words",
    {
      "border-ui-border-interactive": v === current,
      "hover:shadow-elevation-card-rest transition-shadow ease-in-out duration-150":
        v !== current,
    }
  )}
  data-testid="option-button"
>
  {v}
</button>

          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
