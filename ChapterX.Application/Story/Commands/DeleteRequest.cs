using MediatR;

namespace ChapterX.Application.Story.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
