using ChapterX.Domain.Shared;

namespace ChapterX.Domain.Entities
{
    public class HasGenre : IEntity
    {
        public int Id { get; set; }
        public int StoryId { get; set; }
        public int GenreId { get; set; }
        public Story Story { get; set; } = null!;
        public Genre Genre { get; set; } = null!;
    }
}
