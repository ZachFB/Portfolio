import AvatarCircles from "@/components/magicui/avatar-circles";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];

export function AvatarC() {
  return (
    <div>
  <AvatarCircles className="absolute right-12 md:bottom-5 bottom-[-40px]" numPeople={99} avatarUrls={avatarUrls} />
  </div>
  )
}
