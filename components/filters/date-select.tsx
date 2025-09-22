import Select from "../ui/select";

interface DateSelectProps {
  onChange: (value: string) => void;
}

export const DateSelect: React.FC<DateSelectProps> = (props) => {
  return (
    <div>
      <span>From date:</span>
      <Select
        className="w-60"
        defaultValue="1 week"
        /* eslint-disable react/prop-types */
        onValueChange={props.onChange}
        options={[
          {
            value: "1 week",
            label: "1 week ago",
          },
          {
            value: "2 weeks",
            label: "2 weeks ago",
          },
          {
            value: "1 month",
            label: "1 month ago",
          },
          {
            value: "2 months",
            label: "2 months ago",
          },
          {
            value: "3 months",
            label: "3 months ago",
          },
          {
            value: "6 months",
            label: "6 months ago",
          },
          {
            value: "1 year",
            label: "1 year ago",
          },
        ]}
      />
    </div>
  );
};
