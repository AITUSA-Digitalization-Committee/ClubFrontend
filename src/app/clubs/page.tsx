import View from "@/components/View";
import Search from "@/components/Search";
import List from "@/components/clubs/List";

function ClubsPage() {
  return (
    <View container className="gap-6">
      <Search />
      <List />
    </View>
  );
}

export default ClubsPage;
