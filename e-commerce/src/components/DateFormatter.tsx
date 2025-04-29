interface DateFormatterProps {
    isoDate: string;
  }
  
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