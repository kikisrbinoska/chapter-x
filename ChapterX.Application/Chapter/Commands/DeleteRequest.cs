using MediatR;

namespace ChapterX.Application.Chapter.Commands
{
    public record DeleteRequest(int Id, int CallerId) : IRequest<DeleteResponse>;
}
