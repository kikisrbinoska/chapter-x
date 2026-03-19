using MediatR;

namespace ChapterX.Application.ContentType.Commands
{
    public record UpdateRequest(int Id) : IRequest<UpdateResponse>;
}
