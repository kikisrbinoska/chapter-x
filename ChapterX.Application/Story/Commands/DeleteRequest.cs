using MediatR;

namespace ChapterX.Application.Story.Commands
{
    public record DeleteRequest(int Id, int CallerId) : IRequest<DeleteResponse>;
}
