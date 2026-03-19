namespace ChapterX.Application.ReadingList.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.ReadingList> ReadingLists);
}
