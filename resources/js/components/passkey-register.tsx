import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { FieldStatus } from '@astryxdesign/core/FieldStatus';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { usePasskeyRegister } from '@laravel/passkeys/react';
import { useState } from 'react';

type Props = {
    onSuccess: () => void;
};

function defaultPasskeyName(): string {
    const ua = navigator.userAgent;

    const browser = [
        { pattern: /Edg|Edge/, name: 'Edge' },
        { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
        { pattern: /Firefox|FxiOS/, name: 'Firefox' },
        { pattern: /Chrome|CriOS/, name: 'Chrome' },
        { pattern: /Safari/, name: 'Safari' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    const os = [
        { pattern: /iPhone/, name: 'iPhone' },
        { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
        { pattern: /Android/, name: 'Android' },
        { pattern: /Mac/, name: 'Mac' },
        { pattern: /Windows/, name: 'Windows' },
    ].find(({ pattern }) => pattern.test(ua))?.name;

    return [browser, os].filter(Boolean).join(' on ') || '';
}

export default function PasskeyRegistration({ onSuccess }: Props) {
    const [name, setName] = useState(defaultPasskeyName);
    const [showForm, setShowForm] = useState(false);
    const { register, isLoading, error, isSupported } = usePasskeyRegister({
        onSuccess: () => {
            setName('');
            setShowForm(false);
            onSuccess();
        },
    });

    if (!isSupported) {
        return (
            <Text color="secondary">
                Passkeys are not supported in this browser.
            </Text>
        );
    }

    if (!showForm) {
        return (
            <HStack>
                <Button label="Add passkey" onClick={() => setShowForm(true)} />
            </HStack>
        );
    }

    return (
        <Card variant="muted">
            <form
                onSubmit={(e) => {
                    e.preventDefault();

                    if (name.trim()) {
                        void register(name);
                    }
                }}
            >
                <VStack gap={4}>
                    <TextInput
                        label="Passkey name"
                        description="A name helps you identify this passkey later."
                        value={name}
                        onChange={setName}
                        placeholder="e.g., MacBook Pro, iPhone"
                        hasAutoFocus
                    />
                    {error && (
                        <FieldStatus
                            type="error"
                            message={error}
                            variant="detached"
                        />
                    )}
                    <HStack gap={2}>
                        <Button
                            type="submit"
                            label="Register passkey"
                            variant="primary"
                            isLoading={isLoading}
                            isDisabled={!name.trim()}
                        />
                        <Button
                            label="Cancel"
                            variant="ghost"
                            onClick={() => {
                                setShowForm(false);
                                setName('');
                            }}
                        />
                    </HStack>
                </VStack>
            </form>
        </Card>
    );
}
