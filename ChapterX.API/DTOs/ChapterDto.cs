namespace ChapterX.API.DTOs
{
    public class ChapterDto
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int? WordCount { get; set; }
        public decimal? Rating { get; set; }
        public DateTime PublishedAt { get; set; }
        public int ViewCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // FK
        public int StoryId { get; set; }

        // Navigation
        public StoryDto Story { get; set; } = null!;
        public ICollection<NeedApprovalDto> NeedApprovals { get; set; } = [];
    }
}
