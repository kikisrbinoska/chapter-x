namespace ChapterX.Application.Writer.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.Writer> Writers);
}
