using ContentTypeEnum = ChapterX.Domain.Entities.ContentType;

namespace ChapterX.Application.ContentType.Queries
{
    public record GetAllResponse(IEnumerable<ContentTypeEnum> ContentTypes);
}
