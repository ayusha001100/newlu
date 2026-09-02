"use client"

import { COUNTRIES } from "@/lib/data/auth"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { NativeSelect, NativeSelectOption } from "@/ui/native-select"

export default function PhoneField({
	countryCode,
	digits,
	error,
	onCountryChange,
	onDigitsChange,
}) {
	return (
		<div>
			<Label className="mb-[7px] font-semibold text-[0.82rem] text-ink-700">
				Mobile number
			</Label>
			<div className="flex gap-2.5">
				<NativeSelect
					aria-label="Country code"
					className="w-[118px] shrink-0 [&_select]:min-h-[46px] [&_select]:rounded-[10px] [&_select]:border-line [&_select]:bg-white [&_select]:py-[13px] [&_select]:pr-8 [&_select]:pl-2.5 [&_select]:text-[0.92rem] [&_select]:text-ink-900 [&_select]:focus-visible:border-ink-900 [&_select]:focus-visible:ring-0"
					onChange={event => onCountryChange(event.target.value)}
					value={countryCode}
				>
					{COUNTRIES.map(country => (
						<NativeSelectOption
							key={country.code}
							value={country.code}
						>
							{country.flag} {country.code}
						</NativeSelectOption>
					))}
				</NativeSelect>
				<Input
					autoComplete="tel"
					className="min-h-[46px]"
					inputMode="numeric"
					onChange={event =>
						onDigitsChange(event.target.value.replace(/\D/g, ""))
					}
					placeholder="98765 43210"
					type="tel"
					value={digits}
				/>
			</div>
			<p className="mt-2 min-h-[18px] text-[#c0392b] text-[0.83rem]">
				{error}
			</p>
		</div>
	)
}
