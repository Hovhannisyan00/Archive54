import Link from "next/link";
import { ICourse } from "../api";
import Image from "next/image";

interface IProps {
  courses: ICourse[];
}

export const CourseList = ({ courses }: IProps) => {
  return (
    <>
      <div
        className="columns"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {courses.map((course) => (
          <div
            className="column"
            key={course.id}
            style={{
              border: "1px solid #eaeaea",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "280px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
            }}
          >
            <Image
              src={"/" + course.cover}
              width={100}
              height={100}
              alt="OK"
              style={{ borderRadius: "8px" }}
            />
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "15px 0 10px 0",
                color: "#333",
              }}
            >
              {course.name}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              for {course.duration} months
            </p>
            <p
              style={{ fontSize: "16px", fontWeight: "bold", color: "#0070f3" }}
            >
              {course.price} AMD per month
            </p>
            {course.modules?.length && (
              <div className="box">
                <strong>Modules</strong>
                <ul>
                  {
                    course.modules.map(mod => 
                      <li key={mod.id}> {mod.titel} for {mod.duration} months</li>
                    )
                  }
                </ul>
              </div>
            )}

            <Link
              href={"/courses/edit/" + course.id}
              style={{
                color: "#0070f3",
                textDecoration: "none",
                marginTop: "10px",
                display: "inline-block",
                border: "1px solid #0070f3",
                padding: "8px 16px",
                borderRadius: "6px",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
