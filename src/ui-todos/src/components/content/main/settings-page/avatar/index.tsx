import { JSX, useState } from 'react';
import Avatar, { AvatarConfig, genConfig } from 'react-nice-avatar';
import { Button, Select, ColorPicker } from 'antd';
import { useUserStore } from '../../../../../store/User.store.ts';
import { useAppSettingsStore } from '../../../../../store/AppSettings.store.ts';
import styles from './styles.module.css';

function ChangeAvatar(): JSX.Element {
    const { currentUser, updateUser } = useUserStore();
    const { setIsLoading } = useAppSettingsStore();

    const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(currentUser.avatar);

    const config = genConfig(avatarConfig);

    function handleInputChange(field: string, value: string): void {
        setAvatarConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value
        }));
    }

    async function updateAvatar(): Promise<void> {
        setIsLoading(true);
        const user = {
            ...currentUser,
            avatar: avatarConfig
        };

        await updateUser(user.Id, user);
        setIsLoading(false);
    }

    return (
        <section>
            <div className={styles.container}>
                <div className={styles.configSection}>
                    <label className={styles.label}>
                        Hair style:
                        <Select
                            placeholder="Choose a hair style"
                            defaultValue={avatarConfig.hairStyle}
                            options={[
                                { label: 'Normal', value: 'normal' },
                                { label: 'Thick', value: 'thick' },
                                { label: 'Mohawk', value: 'mohawk' },
                                { label: 'Woman Long', value: 'womanLong' },
                                { label: 'Woman Short', value: 'womanShort' }
                            ]}
                            onChange={(value) => handleInputChange('hairStyle', value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Eye style:
                        <Select
                            placeholder="Choose an eye style"
                            defaultValue={avatarConfig.eyeStyle}
                            options={[
                                { label: 'Circle', value: 'circle' },
                                { label: 'Oval', value: 'oval' },
                                { label: 'Smile', value: 'smile' }
                            ]}
                            onChange={(value) => handleInputChange('eyeStyle', value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Mouth style:
                        <Select
                            placeholder="Choose a mouth style"
                            defaultValue={avatarConfig.mouthStyle}
                            options={[
                                { label: 'Laugh', value: 'laugh' },
                                { label: 'Smile', value: 'smile' },
                                { label: 'Peace', value: 'peace' }
                            ]}
                            onChange={(value) => handleInputChange('mouthStyle', value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Glasses style:
                        <Select
                            placeholder="Choose a glasses style"
                            defaultValue={avatarConfig.glassesStyle}
                            options={[
                                { label: 'None', value: 'none' },
                                { label: 'Round', value: 'round' },
                                { label: 'Square', value: 'square' }
                            ]}
                            onChange={(value) => handleInputChange('glassesStyle', value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Shirt style:
                        <Select
                            placeholder="Choose a shirt style"
                            defaultValue={avatarConfig.shirtStyle}
                            options={[
                                { label: 'Hoody', value: 'hoody' },
                                { label: 'Short', value: 'short' },
                                { label: 'Polo', value: 'polo' }
                            ]}
                            onChange={(value) => handleInputChange('shirtStyle', value)}
                        />
                    </label>

                    <label className={styles.label}>
                        Hair color:
                        <ColorPicker
                            className={styles.colorPicker}
                            value={avatarConfig.hairColor}
                            onChange={(color: any) =>
                                handleInputChange('hairColor', color.toHexString())
                            }
                            showText
                        />
                    </label>

                    <label className={styles.label}>
                        Face color:
                        <ColorPicker
                            className={styles.colorPicker}
                            value={avatarConfig.faceColor}
                            onChange={(color: any) =>
                                handleInputChange('faceColor', color.toHexString())
                            }
                            showText
                        />
                    </label>

                    <label className={styles.label}>
                        Shirt color:
                        <ColorPicker
                            className={styles.colorPicker}
                            value={avatarConfig.shirtColor}
                            onChange={(color: any) =>
                                handleInputChange('shirtColor', color.toHexString())
                            }
                            showText
                        />
                    </label>
                </div>

                <div className={styles.avatarWrapper}>
                    <Avatar className={styles.avatar} {...config} />
                </div>
            </div>

            <Button
                type="primary"
                className={styles.submitButton}
                onClick={async () => {
                    await updateAvatar();
                }}
            >
                Submit
            </Button>
        </section>
    );
}

export default ChangeAvatar;
