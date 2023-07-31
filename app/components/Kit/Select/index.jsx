import * as Select from '@radix-ui/react-select';

const SelectComponent = ({ onValueChange, options, placeholder }) => (
	<Select.Root onValueChange={onValueChange}>
		<Select.Trigger>
			<Select.Value placeholder={placeholder} />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content className="border p-2 bg-black">
				<Select.ScrollUpButton />
				<Select.Viewport>
					{options.map((option) => (
						<Select.Item
							className="py-2 px-4 cursor-pointer outline-0 hover:bg-gray-800 text-white"
							key={option.value}
							value={option.value}
						>
							<Select.ItemText>{option.label}</Select.ItemText>
						</Select.Item>
					))}
				</Select.Viewport>
				<Select.ScrollDownButton />
				<Select.Arrow />
			</Select.Content>
		</Select.Portal>
	</Select.Root>
);

export default SelectComponent;