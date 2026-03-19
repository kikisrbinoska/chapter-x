namespace ChapterX.API.DTOs
{
    public class ReadingListItemsDto
    {
        public int ListId { get; set; }
        public int StoryId { get; set; }
        public DateTime AddedAt { get; set; }

        // Navigation
        public ReadingListDto ReadingList { get; set; } = null!;
        public StoryDto Story { get; set; } = null!;
    }
}
