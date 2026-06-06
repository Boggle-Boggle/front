type SettingsSectionProps = {
  title: string;
};

const SettingsSection = (props: SettingsSectionProps) => {
  const { title } = props;
  return <div className="bg-neutral-20 px-4 py-3 text-body1">{title}</div>;
};

export default SettingsSection;
