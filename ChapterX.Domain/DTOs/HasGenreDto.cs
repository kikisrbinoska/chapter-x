namespace ChapterX.API.DTOs
{
    public class HasGenreDto
    {
        public int StoryId { get; set; }
        public int GenreId { get; set; }

        // Navigation
        public StoryDto Story { get; set; } = null!;
        public GenreDto Genre { get; set; } = null!;
    }
}
