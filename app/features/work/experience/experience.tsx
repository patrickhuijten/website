import { MarkdownSpan } from "@/app/markdown-span";
import { ExperienceStoryblok } from "@/types/storyblok";
import styles from "features/work/experience/experience.module.css";
import Image from "next/image";

type ExperienceProps = {
  experience: ExperienceStoryblok;
  active: boolean;
};
export const ExperienceItem = ({ experience, active }: ExperienceProps) => {
  const {
    title,
    company_name,
    description,
    company,
    start_date,
    end_date,
    location,
    current,
    media,
  } = experience;

  return (
    <section className={styles.container} hidden={!active}>
      <header className={styles.header}>
        <Title company={company} company_name={company_name} title={title} />
        <Location location={location} />
        <TimeRange
          start_date={start_date}
          end_date={end_date}
          current={current}
        />
      </header>
      <MarkdownSpan className={styles.description} markdown={description} />
      {media && (
        <div className={styles.media}>
          {media.map((item, index) => (
            <div
              key={item.filename + index}
              style={{ position: "relative", aspectRatio: "5/4" }}
            >
              <Image
                src={item.filename}
                alt={item.alt ?? ""}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const Title = ({
  title,
  company,
  company_name,
}: Pick<ExperienceStoryblok, "title" | "company" | "company_name">) => {
  return (
    <span className={styles.title}>
      <h2>
        {title} @{" "}
        <a href={company?.url} target="_blank">
          {company_name}
        </a>
      </h2>
    </span>
  );
};

const Location = ({ location }: Pick<ExperienceStoryblok, "location">) => {
  return <span className={styles.location}>{location}</span>;
};

const TimeRange = ({
  start_date,
  end_date,
  current,
}: Pick<ExperienceStoryblok, "start_date" | "end_date" | "current">) => {
  return (
    <span className={styles["time-range"]}>
      📆 {start_date} - {current ? "Current" : end_date}
    </span>
  );
};
