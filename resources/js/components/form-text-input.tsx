import { TextInput } from '@astryxdesign/core/TextInput';
import type { TextInputProps } from '@astryxdesign/core/TextInput';
import { useState } from 'react';

type Props = Omit<
    TextInputProps,
    'value' | 'onChange' | 'htmlName' | 'status'
> & {
    name: string;
    defaultValue?: string;
    error?: string;
};

/**
 * Astryx inputs are controlled; Inertia's <Form> reads named DOM inputs.
 * This keeps the value locally and submits it under `name`, with a
 * server validation error shown as the input's error status.
 */
export default function FormTextInput({
    name,
    defaultValue = '',
    error,
    ...props
}: Props) {
    const [value, setValue] = useState(defaultValue);

    return (
        <TextInput
            {...props}
            htmlName={name}
            value={value}
            onChange={setValue}
            status={error ? { type: 'error', message: error } : undefined}
        />
    );
}
