//DateFormatter.tsx
interface DateFormatterProps {
    isoDate: string;
  }
  //format date to "Month Day, Year"
  //e.g. "January 1, 2023"
  const DateFormatter = ({ isoDate }: DateFormatterProps) => {
    const formatDate = (isoDate: string): string => {
      const date = new Date(isoDate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };
  
    return <span>{formatDate(isoDate)}</span>;
  };
  
  export default DateFormatter;