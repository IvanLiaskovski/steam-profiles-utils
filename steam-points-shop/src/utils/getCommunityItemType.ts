export default function getCommunityItemType(itemClass: number) {
  switch (itemClass) {
    case 17:
      return "Steam Startup Movie";
    case 16:
      return "Steam Deck Keyboard";
    case 15:
      return "Animated Avatar";
    case 14:
      return "Avatar Frame";
    case 13:
      return "Mini-Profile";
    case 12:
      return "Chat Effect";
    case 11:
      return "Animated Sticker";
    case 8:
      return "Special Profile";
    case 4:
      return "Emoticon";
    case 3:
      return "Profile Background";
    case 0:
      return "Item Bundle";
  }
  return "Other";
}
