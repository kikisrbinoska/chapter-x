namespace ChapterX.API.DTOs
{
    public class ReadingListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Content { get; set; }
        public bool IsPublic { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // FK
        public int UserId { get; set; }

        // Navigation
        public UserDto User { get; set; } = null!;
        public ICollection<ReadingListItemsDto> ReadingListItems { get; set; } = [];
    }
}
