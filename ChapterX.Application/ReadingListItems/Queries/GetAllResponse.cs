namespace ChapterX.Application.ReadingListItems.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.ReadingListItems> ReadingListItems);
}
