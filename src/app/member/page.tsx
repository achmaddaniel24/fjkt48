import PageWrapper from "@/app/page-wrapper";
import MemberCard  from "@/components/card/MemberCard";

async function getData(endpoint: string) {
  const res = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
    cache: "no-store",
    method: "GET"
  });
  if(!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export default async function MemberPage() {
  const members  = await getData("member");
  const trainees = await getData("trainee");
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold">Anggota JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {members.content.map((member, index) => (
            <MemberCard
              key={index}
              name={member.name}
              gen={member.gen}
              image={member.image}/>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-poppins font-semibold">Trainee JKT48</h1>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 content-center">
          {trainees.content.map((trainee, index) => (
            <MemberCard
              key={index}
              name={trainee.name}
              image={trainee.image}/>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}