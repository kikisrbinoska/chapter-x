using MediatR;
using ContentTypeEnum = ChapterX.Domain.Entities.ContentType;

namespace ChapterX.Application.ContentType.Commands
{
    public record AddRequest(ContentTypeEnum Value) : IRequest<AddResponse>;
}
